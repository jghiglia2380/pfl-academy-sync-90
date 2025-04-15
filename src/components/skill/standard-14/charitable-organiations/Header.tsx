import React from 'react';

const Header = () => {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-6">
        <div className="bg-blue-100 p-4 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Researching and Evaluating Charitable Organizations
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Learn how to evaluate charitable organizations and make informed decisions about your charitable giving.
      </p>
    </div>
  );
};

export default Header;