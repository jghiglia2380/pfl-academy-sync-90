import { getCurrentFafsaYear } from "../../utils/taxYear";

interface BenefitsSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

const BenefitsSection = ({ formData, setFormData }: BenefitsSectionProps) => {
  const { benefitsYears } = getCurrentFafsaYear();

  // Handle checkbox change and update global form state
  const handleCheckboxChange = (benefit: string) => {
    setFormData((prev) => ({
      ...prev,
      benefits: {
        ...prev.benefits,
        [benefit]: !prev.benefits?.[benefit], // Toggle the benefit selection
      },
    }));
  };

  return (
    <div className="border border-purple-900 p-4">
      <h3 className="text-purple-900 font-bold mb-2">
        In {benefitsYears}, did anyone in your parents' household receive:
        (Check all that apply.)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Column 1 */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={formData.benefits?.Medicaid || false}
              onChange={() => handleCheckboxChange("Medicaid")}
            />
            <span>Medicaid</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={formData.benefits?.SSI || false}
              onChange={() => handleCheckboxChange("SSI")}
            />
            <span>Supplemental Security Income (SSI)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={formData.benefits?.SNAP || false}
              onChange={() => handleCheckboxChange("SNAP")}
            />
            <span>Supplemental Nutrition Assistance Program (SNAP)</span>
          </label>
        </div>

        {/* Column 2 */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={formData.benefits?.schoolLunch || false}
              onChange={() => handleCheckboxChange("schoolLunch")}
            />
            <span>Free or Reduced Price School Lunch</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={formData.benefits?.TANF || false}
              onChange={() => handleCheckboxChange("TANF")}
            />
            <span>Temporary Assistance for Needy Families (TANF)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={formData.benefits?.WIC || false}
              onChange={() => handleCheckboxChange("WIC")}
            />
            <span>
              Special Supplemental Nutrition Program for Women, Infants, and
              Children (WIC)
            </span>
          </label>
        </div>
      </div>

      <p className="text-sm mt-4">
        Note: TANF may have a different name in your parents' state. Call
        1-800-433-3243 to find out the name of the state's program.
      </p>
    </div>
  );
};

export default BenefitsSection;
