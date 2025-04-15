import React from 'react';
import { Scale } from 'lucide-react';
import TaxSystemDefinitions from './TaxSystemDefinitions';
import { TAX_SYSTEMS } from '../utils/taxSystems';


const TaxSystemHeader: React.FC = () => {
  return (
    <>
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Scale className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Tax System Analysis
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          For each scenario, select which tax system the individual would likely prefer and explain why
        </p>
      </div>
      <TaxSystemDefinitions taxSystems={TAX_SYSTEMS} />
    </>
  );
};

export default TaxSystemHeader;