import { getCurrentFafsaYear } from "../../utils/taxYear";

interface TaxReturnInfoProps {
  formData: any;
  setFormData: (data: any) => void;
}

const TaxReturnInfo = ({ formData, setFormData }: TaxReturnInfoProps) => {
  const { taxYear } = getCurrentFafsaYear();

  // Handle selection and update global form state
  const handleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      taxReturnStatus: value,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border border-purple-900 p-4">
        <h3 className="text-purple-900 font-bold mb-2">Did you know?</h3>
        <p className="text-sm">
          If your parents file a federal tax return, they may be able to use the
          IRS Data Retrieval Tool. This tool enables your parents to easily,
          accurately, and securely transfer their tax return information into
          the FAFSA form.
        </p>
      </div>

      <div className="border border-purple-900 p-4">
        <h3 className="text-purple-900 font-bold mb-2">
          Did your parents file or will they file a {taxYear} income tax return?
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="taxReturnStatus"
              value="completed"
              checked={formData.taxReturnStatus === "completed"}
              onChange={() => handleChange("completed")}
              className="form-radio"
            />
            <span>My parents have already completed a tax return</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="taxReturnStatus"
              value="will-file"
              checked={formData.taxReturnStatus === "will-file"}
              onChange={() => handleChange("will-file")}
              className="form-radio"
            />
            <span>
              My parents will file, but have not yet completed a tax return
            </span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="taxReturnStatus"
              value="not-filing"
              checked={formData.taxReturnStatus === "not-filing"}
              onChange={() => handleChange("not-filing")}
              className="form-radio"
            />
            <span>My parents are not going to file an income tax return</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default TaxReturnInfo;
