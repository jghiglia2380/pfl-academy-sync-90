export const MultipleJobs = ({ formData, handleInputChange }) => {
  return (
    <div className="border-b border-black">
      <div className="flex">
        <div className="w-1/6 font-bold border-r border-black p-2">
          Step 2:<br />
          Multiple Jobs<br />
          or Spouse<br />
          Works
        </div>
        
        <div className="flex-1 p-2">
          <div className="text-xs leading-tight">
            Complete this step if you (1) hold more than one job at a time, or (2) are married filing jointly and your spouse
            also works. The correct amount of withholding depends on income earned from all of these jobs.
          </div>
          
          <div className="mt-2 text-xs leading-tight">
            Do only one of the following.
          </div>
          
          <div className="mt-2 text-xs leading-tight">
            (a) Use the estimator at www.irs.gov/W4App for the most accurate withholding for this step (and Steps 3–4). If
            you or your spouse have self-employment income, use this option; <span className="italic">or</span>
          </div>
          
          <div className="mt-2 text-xs leading-tight">
            (b) Use the Multiple Jobs Worksheet on page 3 and enter the result in Step 4(c) below; <span className="italic">or</span>
          </div>
          
          <div className="mt-2 text-xs leading-tight flex items-start gap-2">
            <div className="flex-1">
              (c) If there are only two jobs total, you may check this box. Do the same on Form W-4 for the other job. This
              option is generally more accurate than (b) if pay at the lower paying job is more than half of the pay at the
              higher paying job. Otherwise, (b) is more accurate
            </div>
            <input
              type="checkbox"
              name="multipleJobsCheckbox"
              checked={formData.multipleJobsCheckbox}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};