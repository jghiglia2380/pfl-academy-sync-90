import React from 'react';
import { Card } from '../ui/Card';
import { Select } from '../ui/Select';
import { ReportFilters } from '../../types/reporting';

interface FiltersPanelProps {
  filters: ReportFilters;
  onFiltersChange: (filters: ReportFilters) => void;
  districts: Array<{ id: string; name: string }>;
  schools: Array<{ id: string; name: string }>;
  platforms: Array<{ id: string; name: string }>;
  periods: Array<{ id: string; name: string }>;
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({
  filters,
  onFiltersChange,
  districts,
  schools,
  platforms,
  periods
}) => {
  const handleTimeRangeChange = (range: { start: Date; end: Date }) => {
    onFiltersChange({
      ...filters,
      timeRange: range
    });
  };

  const handleDistrictChange = (districtId: string) => {
    onFiltersChange({
      ...filters,
      districtId
    });
  };

  const handleSchoolChange = (schoolId: string) => {
    onFiltersChange({
      ...filters,
      schoolId
    });
  };

  const handlePlatformChange = (platformId: string) => {
    onFiltersChange({
      ...filters,
      curriculumPlatform: platformId
    });
  };

  const handlePeriodChange = (periodId: string) => {
    onFiltersChange({
      ...filters,
      classPeriod: periodId
    });
  };

  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Period
          </label>
          <Select
            value={filters.timeRange}
            onChange={handleTimeRangeChange}
            options={[
              { value: 'current_semester', label: 'Current Semester' },
              { value: 'last_semester', label: 'Previous Semester' },
              { value: 'last_30_days', label: 'Last 30 Days' },
              { value: 'custom', label: 'Custom Range' }
            ]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            District
          </label>
          <Select
            value={filters.districtId}
            onChange={handleDistrictChange}
            options={[
              { value: 'all', label: 'All Districts' },
              ...districts.map(d => ({ value: d.id, label: d.name }))
            ]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            School
          </label>
          <Select
            value={filters.schoolId}
            onChange={handleSchoolChange}
            options={[
              { value: 'all', label: 'All Schools' },
              ...schools.map(s => ({ value: s.id, label: s.name }))
            ]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Curriculum Platform
          </label>
          <Select
            value={filters.curriculumPlatform}
            onChange={handlePlatformChange}
            options={[
              { value: 'all', label: 'All Platforms' },
              ...platforms.map(p => ({ value: p.id, label: p.name }))
            ]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Class Period
          </label>
          <Select
            value={filters.classPeriod}
            onChange={handlePeriodChange}
            options={[
              { value: 'all', label: 'All Periods' },
              ...periods.map(p => ({ value: p.id, label: p.name }))
            ]}
          />
        </div>
      </div>
    </Card>
  );
}; 