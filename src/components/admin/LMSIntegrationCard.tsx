import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import { LMSIntegration, LMSStatus } from '../../types/reporting';

interface LMSIntegrationCardProps {
  integration: LMSIntegration;
  onUpdate: (id: string, updates: Partial<LMSIntegration>) => Promise<void>;
  onSync: (id: string) => Promise<void>;
}

const statusColors = {
  [LMSStatus.CONNECTED]: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    label: 'Connected'
  },
  [LMSStatus.PARTIAL]: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    label: 'Partial'
  },
  [LMSStatus.NOT_CONFIGURED]: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    text: 'text-gray-800',
    label: 'Not Configured'
  },
  [LMSStatus.ERROR]: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    label: 'Error'
  }
};

const integrationLogos = {
  canvas: 'https://www.instructure.com/sites/default/files/image/2021-12/Canvas%20by%20Instructure%20logo%20horizontal.png',
  google_classroom: 'https://www.gstatic.com/images/branding/product/2x/classroom_96dp.png',
  clever: 'https://cdn.clever.com/s/img/favicon.ico',
  powerschool: 'https://www.powerschool.com/wp-content/uploads/PowerSchool_Logo_Bug_RGB.svg'
};

export const LMSIntegrationCard: React.FC<LMSIntegrationCardProps> = ({
  integration,
  onUpdate,
  onSync
}) => {
  const status = statusColors[integration.status];
  const logo = integrationLogos[integration.type];

  const handleSync = async () => {
    try {
      await onSync(integration.id);
    } catch (error) {
      console.error('Failed to sync integration:', error);
    }
  };

  const handleConfigure = async () => {
    try {
      await onUpdate(integration.id, {
        status: LMSStatus.CONNECTED
      });
    } catch (error) {
      console.error('Failed to update integration:', error);
    }
  };

  return (
    <Card className={`${status.bg} ${status.border}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img
            src={logo}
            alt={integration.type}
            className="h-8 mr-2"
          />
          <span className="font-medium capitalize">
            {integration.type.replace('_', ' ')}
          </span>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.text}`}>
          {status.label}
        </span>
      </div>

      {integration.status === LMSStatus.CONNECTED && (
        <>
          <div className="mb-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Last sync</span>
              <span>
                {integration.lastSync
                  ? new Date(integration.lastSync).toLocaleString()
                  : 'Never'}
              </span>
            </div>
            <Progress
              value={integration.syncCount}
              max={100}
              className="h-1"
            />
          </div>
          <p className="text-xs text-gray-500 mb-2">
            {integration.syncCount} student records synced
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSync}
            className="w-full"
          >
            Sync Now
          </Button>
        </>
      )}

      {integration.status === LMSStatus.PARTIAL && (
        <>
          <p className="text-xs text-gray-500 mb-2">
            {integration.errorMessage || 'Some schools pending authorization'}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleConfigure}
            className="w-full"
          >
            Complete Setup
          </Button>
        </>
      )}

      {integration.status === LMSStatus.NOT_CONFIGURED && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleConfigure}
          className="w-full"
        >
          Configure Integration
        </Button>
      )}

      {integration.status === LMSStatus.ERROR && (
        <>
          <p className="text-xs text-red-500 mb-2">
            {integration.errorMessage || 'Integration error occurred'}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleConfigure}
            className="w-full"
          >
            Troubleshoot
          </Button>
        </>
      )}
    </Card>
  );
}; 