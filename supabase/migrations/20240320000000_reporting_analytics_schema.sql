-- Create enum types
CREATE TYPE report_type AS ENUM ('progress', 'engagement', 'completion', 'assessment');
CREATE TYPE report_format AS ENUM ('pdf', 'csv', 'excel');
CREATE TYPE lms_status AS ENUM ('connected', 'partial', 'not_configured', 'error');
CREATE TYPE integration_type AS ENUM ('canvas', 'google_classroom', 'clever', 'powerschool');

-- Create tables
CREATE TABLE reporting_configs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    district_id UUID REFERENCES districts(id),
    school_id UUID REFERENCES schools(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    config JSONB NOT NULL
);

CREATE TABLE lms_integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    district_id UUID REFERENCES districts(id),
    school_id UUID REFERENCES schools(id),
    type integration_type NOT NULL,
    status lms_status NOT NULL,
    last_sync TIMESTAMP WITH TIME ZONE,
    sync_count INTEGER DEFAULT 0,
    error_message TEXT,
    config JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE scheduled_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    district_id UUID REFERENCES districts(id),
    school_id UUID REFERENCES schools(id),
    user_id UUID REFERENCES auth.users(id),
    report_type report_type NOT NULL,
    format report_format NOT NULL,
    schedule JSONB NOT NULL,
    filters JSONB,
    last_run TIMESTAMP WITH TIME ZONE,
    next_run TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE report_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scheduled_report_id UUID REFERENCES scheduled_reports(id),
    user_id UUID REFERENCES auth.users(id),
    status TEXT NOT NULL,
    filters JSONB,
    result_url TEXT,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes
CREATE INDEX idx_reporting_configs_district ON reporting_configs(district_id);
CREATE INDEX idx_reporting_configs_school ON reporting_configs(school_id);
CREATE INDEX idx_lms_integrations_district ON lms_integrations(district_id);
CREATE INDEX idx_lms_integrations_school ON lms_integrations(school_id);
CREATE INDEX idx_scheduled_reports_district ON scheduled_reports(district_id);
CREATE INDEX idx_scheduled_reports_school ON scheduled_reports(school_id);
CREATE INDEX idx_scheduled_reports_user ON scheduled_reports(user_id);
CREATE INDEX idx_report_runs_scheduled ON report_runs(scheduled_report_id);
CREATE INDEX idx_report_runs_user ON report_runs(user_id);

-- Create RLS policies
ALTER TABLE reporting_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE lms_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_runs ENABLE ROW LEVEL SECURITY;

-- Reporting configs policies
CREATE POLICY "District admins can manage their reporting configs"
    ON reporting_configs
    FOR ALL
    USING (auth.uid() IN (
        SELECT user_id FROM district_admins WHERE district_id = reporting_configs.district_id
    ));

-- LMS integrations policies
CREATE POLICY "District admins can manage their LMS integrations"
    ON lms_integrations
    FOR ALL
    USING (auth.uid() IN (
        SELECT user_id FROM district_admins WHERE district_id = lms_integrations.district_id
    ));

-- Scheduled reports policies
CREATE POLICY "Users can manage their own scheduled reports"
    ON scheduled_reports
    FOR ALL
    USING (auth.uid() = user_id);

CREATE POLICY "District admins can view all reports in their district"
    ON scheduled_reports
    FOR SELECT
    USING (auth.uid() IN (
        SELECT user_id FROM district_admins WHERE district_id = scheduled_reports.district_id
    ));

-- Report runs policies
CREATE POLICY "Users can view their own report runs"
    ON report_runs
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "District admins can view all report runs in their district"
    ON report_runs
    FOR SELECT
    USING (auth.uid() IN (
        SELECT user_id FROM district_admins 
        WHERE district_id IN (
            SELECT district_id FROM scheduled_reports 
            WHERE id = report_runs.scheduled_report_id
        )
    ));

-- Create functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_reporting_configs_updated_at
    BEFORE UPDATE ON reporting_configs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lms_integrations_updated_at
    BEFORE UPDATE ON lms_integrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scheduled_reports_updated_at
    BEFORE UPDATE ON scheduled_reports
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Report Scheduling Functions
CREATE OR REPLACE FUNCTION schedule_report_job(report_id UUID)
RETURNS void AS $$
BEGIN
  -- Insert into job queue
  INSERT INTO report_jobs (
    report_id,
    status,
    scheduled_at,
    created_at
  ) VALUES (
    report_id,
    'scheduled',
    NOW() + INTERVAL '1 hour',
    NOW()
  );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION cancel_scheduled_report(report_id UUID)
RETURNS void AS $$
BEGIN
  -- Cancel job in queue
  UPDATE report_jobs
  SET status = 'cancelled',
      cancelled_at = NOW()
  WHERE report_id = report_id
    AND status = 'scheduled';
END;
$$ LANGUAGE plpgsql;

-- LMS Webhook Handler
CREATE OR REPLACE FUNCTION handle_lms_webhook(integration_id UUID, payload JSONB)
RETURNS void AS $$
BEGIN
  -- Update integration status based on webhook payload
  UPDATE lms_integrations
  SET status = payload->>'status',
      last_sync = NOW(),
      sync_count = sync_count + 1,
      error_message = payload->>'error_message'
  WHERE id = integration_id;
END;
$$ LANGUAGE plpgsql;

-- Report Generation Queue
CREATE OR REPLACE FUNCTION queue_report_generation(
  report_type report_type,
  format report_format,
  filters JSONB
)
RETURNS UUID AS $$
DECLARE
  new_report_id UUID;
BEGIN
  -- Create report run
  INSERT INTO report_runs (
    report_type,
    format,
    filters,
    status,
    created_at
  ) VALUES (
    report_type,
    format,
    filters,
    'queued',
    NOW()
  ) RETURNING id INTO new_report_id;

  -- Insert into job queue
  INSERT INTO report_jobs (
    report_id,
    status,
    scheduled_at,
    created_at
  ) VALUES (
    new_report_id,
    'queued',
    NOW(),
    NOW()
  );

  RETURN new_report_id;
END;
$$ LANGUAGE plpgsql;

-- Create report_jobs table
CREATE TABLE report_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID REFERENCES report_runs(id),
  status TEXT NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for report_jobs
CREATE INDEX idx_report_jobs_status ON report_jobs(status);
CREATE INDEX idx_report_jobs_scheduled ON report_jobs(scheduled_at);

-- Add trigger for report_jobs
CREATE TRIGGER update_report_jobs_updated_at
  BEFORE UPDATE ON report_jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 