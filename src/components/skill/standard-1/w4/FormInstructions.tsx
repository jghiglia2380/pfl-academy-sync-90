export const FormInstructions = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <h2 className="text-xl font-bold mb-4">Instructions for Completing Form W-4</h2>
      <div className="space-y-4 text-gray-700">
        <p className="font-semibold text-gray-900">Important Note:</p>
        <p>
          For this exercise, you will be working with mock information provided through different scenarios. 
          DO NOT use your personal information. Instead, use the details from the scenario provided above.
        </p>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">General Guidelines:</h3>
          <ul className="list-disc ml-6 space-y-1">
            <li>Read your assigned scenario carefully</li>
            <li>Use ONLY the information provided in your scenario</li>
            <li>Complete all required fields based on the scenario details</li>
            <li>For the signature, type the name provided in your scenario</li>
            <li>Social Security Numbers should be entered in XXX-XX-XXXX format</li>
          </ul>
        </div>
      </div>
    </div>
  );
};