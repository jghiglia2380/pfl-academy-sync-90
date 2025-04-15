const Header = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-blue-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Developing a Plan for Responsible Gambling
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Learn how to set healthy boundaries and maintain control while gambling through this interactive exercise. Create a personalized plan focusing on budgeting, time management, and responsible practices.
      </p>
    </div>
  );
};

export default Header;