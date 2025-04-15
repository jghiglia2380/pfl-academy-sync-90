export default function Header() {
  return (
    <header className="text-center mb-12">
      <div className="flex justify-center mb-4">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-blue-500"
      >
        <path
          d="M24 4L4 44H44L24 4Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M24 34V36"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M24 18L24 28"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Risk Tolerance Assessment
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Discover your investment style through this interactive quiz. Learn how your risk tolerance affects your financial decisions.
      </p>
    </header>
  );
}