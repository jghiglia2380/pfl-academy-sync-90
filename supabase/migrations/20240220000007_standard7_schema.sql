-- Create tables for Standard 7 (Borrowing Money)
create table if not exists standard7_submissions (
    id uuid primary key default uuid_generate_v4(),
    student_id uuid not null references auth.users(id),
    content jsonb not null,
    submitted_at timestamp with time zone not null default now(),
    previous_submission_id uuid references standard7_submissions(id),
    constraint content_validation check (jsonb_typeof(content) = 'object')
);

create table if not exists standard7_drafts (
    id uuid primary key default uuid_generate_v4(),
    student_id uuid not null references auth.users(id) unique,
    content jsonb not null,
    last_updated timestamp with time zone not null default now(),
    constraint content_validation check (jsonb_typeof(content) = 'object')
);

create table if not exists standard7_grades (
    id uuid primary key default uuid_generate_v4(),
    submission_id uuid not null references standard7_submissions(id) unique,
    instructor_id uuid not null references auth.users(id),
    score integer not null check (score >= 0 and score <= 100),
    rubric jsonb not null,
    feedback_count integer not null default 0,
    graded_at timestamp with time zone not null default now(),
    constraint rubric_validation check (
        jsonb_typeof(rubric) = 'object'
        and jsonb_typeof(rubric->'costAnalysis') = 'number'
        and jsonb_typeof(rubric->'sourceEvaluation') = 'number'
        and jsonb_typeof(rubric->'decisionFramework') = 'number'
    )
);

create table if not exists standard7_feedback (
    id uuid primary key default uuid_generate_v4(),
    submission_id uuid not null references standard7_submissions(id),
    instructor_id uuid not null references auth.users(id),
    content text not null,
    created_at timestamp with time zone not null default now()
);

create table if not exists standard7_assessments (
    id uuid primary key default uuid_generate_v4(),
    student_id uuid not null references auth.users(id),
    submission_id uuid references standard7_submissions(id),
    draft_id uuid references standard7_drafts(id),
    status text not null check (status in ('not_started', 'in_progress', 'submitted', 'resubmit', 'completed')),
    score integer check (score >= 0 and score <= 100),
    rubric jsonb,
    attempt_number integer not null default 1,
    submitted_at timestamp with time zone,
    graded_at timestamp with time zone,
    created_at timestamp with time zone not null default now(),
    last_updated timestamp with time zone not null default now()
);

-- Create indexes
create index if not exists idx_standard7_submissions_student on standard7_submissions(student_id);
create index if not exists idx_standard7_grades_instructor on standard7_grades(instructor_id);
create index if not exists idx_standard7_feedback_submission on standard7_feedback(submission_id);
create index if not exists idx_standard7_assessments_student on standard7_assessments(student_id);
create index if not exists idx_standard7_assessments_status on standard7_assessments(status);

-- Enable Row Level Security
alter table standard7_submissions enable row level security;
alter table standard7_drafts enable row level security;
alter table standard7_grades enable row level security;
alter table standard7_feedback enable row level security;
alter table standard7_assessments enable row level security;

-- Create policies
create policy "Students can view their own submissions"
    on standard7_submissions for select
    to authenticated
    using (auth.uid() = student_id);

create policy "Students can create their own submissions"
    on standard7_submissions for insert
    to authenticated
    with check (auth.uid() = student_id);

create policy "Students can view and update their own drafts"
    on standard7_drafts for all
    to authenticated
    using (auth.uid() = student_id)
    with check (auth.uid() = student_id);

create policy "Instructors can view all submissions"
    on standard7_submissions for select
    to authenticated
    using (exists (
        select 1 from users
        where users.id = auth.uid()
        and users.role = 'instructor'
    ));

create policy "Instructors can create and update grades"
    on standard7_grades for all
    to authenticated
    using (exists (
        select 1 from users
        where users.id = auth.uid()
        and users.role = 'instructor'
    ));

create policy "Instructors can create and view feedback"
    on standard7_feedback for all
    to authenticated
    using (exists (
        select 1 from users
        where users.id = auth.uid()
        and users.role = 'instructor'
    ));

create policy "Students can view feedback on their submissions"
    on standard7_feedback for select
    to authenticated
    using (exists (
        select 1 from standard7_submissions
        where standard7_submissions.id = standard7_feedback.submission_id
        and standard7_submissions.student_id = auth.uid()
    ));

create policy "Students can view their own assessments"
    on standard7_assessments for select
    to authenticated
    using (auth.uid() = student_id);

create policy "Instructors can view all assessments"
    on standard7_assessments for select
    to authenticated
    using (exists (
        select 1 from users
        where users.id = auth.uid()
        and users.role = 'instructor'
    ));

-- Create function to update feedback count
create or replace function update_standard7_feedback_count()
returns trigger as $$
begin
    if tg_op = 'INSERT' then
        update standard7_grades
        set feedback_count = feedback_count + 1
        where submission_id = new.submission_id;
    elsif tg_op = 'DELETE' then
        update standard7_grades
        set feedback_count = feedback_count - 1
        where submission_id = old.submission_id;
    end if;
    return null;
end;
$$ language plpgsql;

-- Create trigger for feedback count
create trigger standard7_feedback_count_trigger
after insert or delete on standard7_feedback
for each row
execute function update_standard7_feedback_count(); 