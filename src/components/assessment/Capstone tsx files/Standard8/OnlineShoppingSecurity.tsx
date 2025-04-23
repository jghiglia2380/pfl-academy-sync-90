import React from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { Standard8Submission } from '../../../types/standard8';

interface OnlineShoppingSecurityProps {
  register: UseFormRegister<Standard8Submission>;
  watch: UseFormWatch<Standard8Submission>;
  setValue: UseFormSetValue<Standard8Submission>;
}

export const OnlineShoppingSecurity: React.FC<OnlineShoppingSecurityProps> = ({
  register,
  watch,
  setValue
}) => {
  const retailers = [
    {
      name: 'Major E-commerce Platform',
      features: {
        encryption: true,
        twoFactorAuth: true,
        securePayment: true,
        fraudMonitoring: true
      }
    },
    {
      name: 'Small Specialty Shop',
      features: {
        encryption: true,
        twoFactorAuth: false,
        securePayment: true,
        fraudMonitoring: false
      }
    },
    {
      name: 'Marketplace Seller',
      features: {
        encryption: true,
        twoFactorAuth: false,
        securePayment: true,
        fraudMonitoring: true
      }
    }
  ];

  const paymentMethods = [
    {
      name: 'Credit Card',
      features: {
        fraudProtection: true,
        realTimeMonitoring: true,
        virtualCardNumbers: true
      }
    },
    {
      name: 'Digital Wallet',
      features: {
        fraudProtection: true,
        realTimeMonitoring: true,
        virtualCardNumbers: true
      }
    },
    {
      name: 'Bank Transfer',
      features: {
        fraudProtection: false,
        realTimeMonitoring: false,
        virtualCardNumbers: false
      }
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Online Shopping Security</h2>

      {/* Scenario 1: Retailer Comparison */}
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Scenario 1: Retailer Comparison</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {retailers.map((retailer, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h5 className="font-medium text-blue-800 mb-3">{retailer.name}</h5>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <i className={`fas fa-shield-alt ${retailer.features.encryption ? 'text-green-500' : 'text-red-500'} mt-1 mr-2`}></i>
                  <span>HTTPS encryption</span>
                </li>
                <li className="flex items-start">
                  <i className={`fas fa-key ${retailer.features.twoFactorAuth ? 'text-green-500' : 'text-red-500'} mt-1 mr-2`}></i>
                  <span>Two-factor authentication available</span>
                </li>
                <li className="flex items-start">
                  <i className={`fas fa-lock ${retailer.features.securePayment ? 'text-green-500' : 'text-red-500'} mt-1 mr-2`}></i>
                  <span>Secure payment gateway</span>
                </li>
                <li className="flex items-start">
                  <i className={`fas fa-user-shield ${retailer.features.fraudMonitoring ? 'text-green-500' : 'text-red-500'} mt-1 mr-2`}></i>
                  <span>24/7 fraud monitoring</span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="response-area mb-8">
        <label className="block">
          <i className="fas fa-shield-alt"></i>
          2.1 Retailer Security Analysis
        </label>
        <div className="calculation-field">
          <p>
            <i className="fas fa-pencil-alt"></i>
            Analyze security features and risks for each retailer:
          </p>
          <textarea
            {...register('onlineShoppingSecurity.retailerAnalysis')}
            rows={4}
            className="font-mono"
            placeholder="Compare and analyze the security features, risks, and protection measures for each retailer..."
          />
          <div className="hint">
            <i className="fas fa-info-circle mr-1"></i>
            Include specific examples of security measures and their effectiveness
          </div>
        </div>
      </div>

      {/* Scenario 2: Payment Security */}
      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Scenario 2: Payment Security</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paymentMethods.map((method, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h5 className="font-medium text-blue-800 mb-3">{method.name}</h5>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <i className={`fas fa-shield-alt ${method.features.fraudProtection ? 'text-green-500' : 'text-red-500'} mt-1 mr-2`}></i>
                  <span>Fraud protection up to $50</span>
                </li>
                <li className="flex items-start">
                  <i className={`fas fa-chart-line ${method.features.realTimeMonitoring ? 'text-green-500' : 'text-red-500'} mt-1 mr-2`}></i>
                  <span>Real-time monitoring</span>
                </li>
                <li className="flex items-start">
                  <i className={`fas fa-credit-card ${method.features.virtualCardNumbers ? 'text-green-500' : 'text-red-500'} mt-1 mr-2`}></i>
                  <span>Temporary virtual card numbers available</span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="response-area mb-8">
        <label className="block">
          <i className="fas fa-credit-card"></i>
          2.2 Payment Method Security Analysis
        </label>
        <div className="calculation-field">
          <p>
            <i className="fas fa-pencil-alt"></i>
            Compare security features of each payment method:
          </p>
          <textarea
            {...register('onlineShoppingSecurity.paymentMethodAnalysis')}
            rows={4}
            className="font-mono"
            placeholder="Analyze the security features, risks, and protection measures for each payment method..."
          />
          <div className="hint">
            <i className="fas fa-info-circle mr-1"></i>
            Consider fraud protection, authentication methods, and risk levels
          </div>
        </div>
      </div>

      {/* Security Protocol */}
      <div className="response-area mb-8">
        <label className="block">
          <i className="fas fa-lock"></i>
          2.3 Security Protocol Development
        </label>
        <div className="calculation-field">
          <p>
            <i className="fas fa-pencil-alt"></i>
            Develop comprehensive security protocols:
          </p>
          <textarea
            {...register('onlineShoppingSecurity.securityProtocol')}
            rows={4}
            className="font-mono"
            placeholder="Develop a comprehensive security protocol incorporating best practices from both scenarios..."
          />
          <div className="hint">
            <i className="fas fa-info-circle mr-1"></i>
            Include step-by-step procedures for secure online shopping
          </div>
        </div>
      </div>

      {/* Risk Mitigation */}
      <div className="response-area">
        <label className="block">
          <i className="fas fa-user-shield"></i>
          2.4 Risk Mitigation Recommendations
        </label>
        <textarea
          {...register('onlineShoppingSecurity.riskMitigation')}
          rows={4}
          placeholder="Provide specific recommendations for mitigating risks identified in your analysis..."
        />
        <div className="hint">
          <i className="fas fa-info-circle mr-1"></i>
          Support your recommendations with evidence from your analysis
        </div>
      </div>
    </div>
  );
}; 