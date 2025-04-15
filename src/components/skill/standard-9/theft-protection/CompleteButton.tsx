const CompleteButton = ({ isComplete, onSuccessfulSubmit }) => {
  const handleComplete = () => {
    if (!isComplete) {
      alert(
        "Please complete all sections of the checklist and write a reflection before submitting."
      );
      onSuccessfulSubmit(false);
      return;
    }
    alert("Exercise completed!");
    onSuccessfulSubmit(true);
  };

  return (
    <div className="flex justify-end mt-6">
      <button
        onClick={handleComplete}
        className={`px-4 py-2 rounded transition-colors ${
          isComplete
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Submit Response
      </button>
    </div>
  );
};

export default CompleteButton;
