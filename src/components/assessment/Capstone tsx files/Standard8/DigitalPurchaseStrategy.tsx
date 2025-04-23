import React from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { Standard8Submission } from '../../../types/standard8';

interface DigitalPurchaseStrategyProps {
  register: UseFormRegister<Standard8Submission>;
  watch: UseFormWatch<Standard8Submission>;
  setValue: UseFormSetValue<Standard8Submission>;
}

export const DigitalPurchaseStrategy: React.FC<DigitalPurchaseStrategyProps> = ({
  register,
  watch,
  setValue
}) => {
  const purchaseOptions = [
    {
      retailer: 'Premium Electronics Store',
      price: 1299.99,
      shipping: {
        cost: 0,
        days: 2
      },
      warranty: {
        cost: 99.99,
        type: 'Extended 3-year'
      },
      additionalFeatures: [
        'Free setup assistance',
        'Price match guarantee',
        'In-store pickup available'
      ]
    },
    {
      retailer: 'Online Marketplace',
      price: 1199.99,
      shipping: {
        cost: 29.99,
        days: 5
      },
      warranty: {
        cost: 79.99,
        type: 'Standard 1-year'
      },
      additionalFeatures: [
        'Customer reviews available',
        'Multiple seller options',
        'Return shipping included'
      ]
    },
    {
      retailer: 'Direct Manufacturer',
      price: 1249.99,
      shipping: {
        cost: 0,
        days: 3
      },
      warranty: {
        cost: 0,
        type: 'Manufacturer 2-year'
      },
      additionalFeatures: [
        'Custom configuration options',
        'Direct technical support',
        'Exclusive accessories'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Digital Purchase Strategy</h2>

      {/* High-Value Electronics Purchase Scenario */}
      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <h4 className="font-medium text-gray-800 mb-4">High-Value Electronics Purchase</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {purchaseOptions.map((option, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h5 className="font-medium text-blue-800 mb-3">{option.retailer}</h5>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-tag text-green-500 mt-1 mr-2"></i>
                  <span>Price: ${option.price.toFixed(2)}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-truck text-blue-500 mt-1 mr-2"></i>
                  <span>Shipping: {option.shipping.cost === 0 ? 'Free' : `$${option.shipping.cost}`} ({option.shipping.days} days)</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-shield-alt text-purple-500 mt-1 mr-2"></i>
                  <span>Warranty: {option.warranty.type} {option.warranty.cost === 0 ? '(Included)' : `($${option.warranty.cost})`}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-star text-yellow-500 mt-1 mr-2"></i>
                  <span>Additional Features:</span>
                </li>
                <ul className="ml-6 space-y-1">
                  {option.additionalFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="response-area mb-8">
        <label className="block">
          <i className="fas fa-table"></i>
          3.1 Decision Matrix
        </label>
        <div className="calculation-field">
          <p>
            <i className="fas fa-pencil-alt"></i>
            Create a decision matrix comparing the purchase options:
          </p>
          <textarea
            {...register('digitalPurchaseStrategy.decisionMatrix')}
            rows={4}
            className="font-mono"
            placeholder="Create a decision matrix comparing price, shipping, warranty, and additional features..."
          />
          <div className="hint">
            <i className="fas fa-info-circle mr-1"></i>
            Include weighted scoring for each factor based on importance
          </div>
        </div>
      </div>

      <div className="response-area mb-8">
        <label className="block">
          <i className="fas fa-calculator"></i>
          3.2 Total Cost Analysis
        </label>
        <div className="calculation-field">
          <p>
            <i className="fas fa-pencil-alt"></i>
            Calculate and compare total costs for each option:
          </p>
          <textarea
            {...register('digitalPurchaseStrategy.totalCostAnalysis')}
            rows={4}
            className="font-mono"
            placeholder="Calculate total costs including price, shipping, warranty, and any additional fees..."
          />
          <div className="hint">
            <i className="fas fa-info-circle mr-1"></i>
            Consider both immediate and long-term costs in your analysis
          </div>
        </div>
      </div>

      <div className="response-area mb-8">
        <label className="block">
          <i className="fas fa-chess"></i>
          3.3 Purchase Strategy
        </label>
        <div className="calculation-field">
          <p>
            <i className="fas fa-pencil-alt"></i>
            Develop a comprehensive purchase strategy:
          </p>
          <textarea
            {...register('digitalPurchaseStrategy.purchaseStrategy')}
            rows={4}
            className="font-mono"
            placeholder="Outline your recommended purchase strategy based on the decision matrix and cost analysis..."
          />
          <div className="hint">
            <i className="fas fa-info-circle mr-1"></i>
            Include timing, payment method, and any negotiation strategies
          </div>
        </div>
      </div>

      <div className="response-area">
        <label className="block">
          <i className="fas fa-shield-alt"></i>
          3.4 Risk Mitigation
        </label>
        <div className="calculation-field">
          <p>
            <i className="fas fa-pencil-alt"></i>
            Identify and address potential risks:
          </p>
          <textarea
            {...register('digitalPurchaseStrategy.riskMitigation')}
            rows={4}
            className="font-mono"
            placeholder="Identify potential risks and outline strategies to mitigate them..."
          />
          <div className="hint">
            <i className="fas fa-info-circle mr-1"></i>
            Consider product quality, delivery issues, and warranty coverage
          </div>
        </div>
      </div>
    </div>
  );
}; 