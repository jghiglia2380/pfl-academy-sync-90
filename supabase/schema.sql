-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create custom types
create type user_role as enum ('admin', 'teacher', 'student');
create type assessment_type as enum ('quiz', 'midterm', 'final', 'project', 'participation');
create type question_type as enum ('multiple_choice', 'short_response', 'situational', 'fill_in_blank');

-- Create tables
create table users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  full_name text not null,
  role user_role not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table teachers (
  id uuid primary key references users(id),
  permissions jsonb not null default '{
    "canEditCurriculum": false,
    "canManageAssessments": false,
    "canViewReports": false
  }',
  classes text[] default array[]::text[]
);

create table standards (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  order_index integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table chapters (
  id uuid primary key default uuid_generate_v4(),
  standard_id uuid references standards(id) not null,
  title text not null,
  type text not null check (type in ('day1', 'day2')),
  order_index integer not null,
  content jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table assessments (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  type assessment_type not null,
  standard_id uuid references standards(id),
  chapter_id uuid references chapters(id),
  questions jsonb not null,
  time_limit integer, -- in minutes
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references users(id) not null
);

create table grade_weighting (
  id uuid primary key default uuid_generate_v4(),
  quizzes integer not null default 20,
  midterms integer not null default 25,
  finals integer not null default 30,
  projects integer not null default 15,
  participation integer not null default 10,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint total_weight check (quizzes + midterms + finals + projects + participation = 100)
);

create table activity_log (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) not null,
  action text not null,
  details jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index idx_standards_order on standards(order_index);
create index idx_chapters_standard on chapters(standard_id);
create index idx_chapters_order on chapters(order_index);
create index idx_assessments_standard on assessments(standard_id);
create index idx_assessments_chapter on assessments(chapter_id);
create index idx_activity_log_user on activity_log(user_id);

-- Create RLS policies
alter table users enable row level security;
alter table teachers enable row level security;
alter table standards enable row level security;
alter table chapters enable row level security;
alter table assessments enable row level security;
alter table grade_weighting enable row level security;
alter table activity_log enable row level security;

-- Users policies
create policy "Users can view their own data"
  on users for select
  using (auth.uid() = id);

create policy "Admins can view all users"
  on users for select
  using (exists (
    select 1 from users
    where id = auth.uid() and role = 'admin'
  ));

-- Teachers policies
create policy "Teachers can view their own data"
  on teachers for select
  using (auth.uid() = id);

create policy "Admins can manage teachers"
  on teachers for all
  using (exists (
    select 1 from users
    where id = auth.uid() and role = 'admin'
  ));

-- Standards and Chapters policies
create policy "Anyone can view standards and chapters"
  on standards for select
  using (true);

create policy "Admins can manage standards"
  on standards for all
  using (exists (
    select 1 from users
    where id = auth.uid() and role = 'admin'
  ));

create policy "Anyone can view chapters"
  on chapters for select
  using (true);

create policy "Admins can manage chapters"
  on chapters for all
  using (exists (
    select 1 from users
    where id = auth.uid() and role = 'admin'
  ));

-- Assessments policies
create policy "Anyone can view assessments"
  on assessments for select
  using (true);

create policy "Teachers and admins can manage assessments"
  on assessments for all
  using (exists (
    select 1 from users
    where id = auth.uid() and (role = 'admin' or role = 'teacher')
  ));

-- Grade Weighting policies
create policy "Anyone can view grade weighting"
  on grade_weighting for select
  using (true);

create policy "Admins can manage grade weighting"
  on grade_weighting for all
  using (exists (
    select 1 from users
    where id = auth.uid() and role = 'admin'
  ));

-- Activity Log policies
create policy "Users can view their own activity"
  on activity_log for select
  using (auth.uid() = user_id);

create policy "Admins can view all activity"
  on activity_log for select
  using (exists (
    select 1 from users
    where id = auth.uid() and role = 'admin'
  ));

-- Create functions
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers
create trigger update_users_updated_at
  before update on users
  for each row
  execute function update_updated_at_column();

create trigger update_grade_weighting_updated_at
  before update on grade_weighting
  for each row
  execute function update_updated_at_column(); 