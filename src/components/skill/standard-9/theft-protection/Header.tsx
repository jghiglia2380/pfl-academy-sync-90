const Header = () => {
  return (
    <div className="text-center mb-8">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto mb-4"
      >
        <path
          d="M24 4L6 12V22C6 31.9 13.4 41.2 24 44C34.6 41.2 42 31.9 42 22V12L24 4Z"
          fill="#4F46E5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 23L22 29L32 19"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Identity Theft Protection Checklist
      </h1>

      <p className="text-gray-600 max-w-2xl mx-auto">
        Create a personalized checklist to protect your identity. Learn
        practical strategies to safeguard your personal information and improve
        your digital security habits.
      </p>
    </div>
  );
};

export default Header;
