import { getCurrentFafsaYear } from "../../utils/taxYear";

const FinancialItems = () => {
  const { taxYear } = getCurrentFafsaYear();
  
  return (
    <div className="border border-purple-900 p-4">
      <h3 className="text-purple-900 font-bold mb-4">Did your parents have any of the following items in {taxYear}?</h3>
      <p className="mb-4">Check all that apply. Once online, you may be asked to report amounts paid or received by your parents.</p>
      
      {/* Rest of the component remains the same */}
    </div>
  );
};

export default FinancialItems;