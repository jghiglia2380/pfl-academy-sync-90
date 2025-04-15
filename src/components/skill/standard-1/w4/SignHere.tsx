interface SignHereProps {
  formData: {
    signature: string;
    date: string;
    employerName: string;
    firstDate: string;
    ein: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SignHere = ({ formData, handleInputChange }: SignHereProps) => {
  return (
    <div>
      <div className="border-b border-black">
        <div className="flex">
          <div className="w-1/6 font-bold border-r border-black p-2">
            Step 5:<br />
            Sign<br />
            Here
          </div>
          
          <div className="flex-1 p-2">
            <div className="text-xs mb-4">
              Under penalties of perjury, I declare that this certificate, to the best of my knowledge and belief, is true, correct, and complete.
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  name="signature"
                  value={formData.signature}
                  onChange={handleInputChange}
                  className="w-full border-b border-black bg-transparent"
                />
                <div className="text-xs mt-1">Employee's signature (This form is not valid unless you sign it.)</div>
              </div>
              
              <div className="w-1/3">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full border-b border-black bg-transparent"
                />
                <div className="text-xs mt-1">Date</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-black">
        <div className="flex">
          <div className="w-1/6 font-bold border-r border-black p-2">
            Employers<br />
            Only
          </div>
          
          <div className="flex-1">
            <div className="grid grid-cols-3">
              <div className="p-2 border-r border-black">
                <input
                  type="text"
                  name="employerName"
                  value={formData.employerName}
                  onChange={handleInputChange}
                  className="w-full border-b border-dotted border-black bg-transparent"
                />
                <div className="text-xs mt-1">Employer's name and address</div>
              </div>
              
              <div className="p-2 border-r border-black">
                <input
                  type="date"
                  name="firstDate"
                  value={formData.firstDate}
                  onChange={handleInputChange}
                  className="w-full border-b border-dotted border-black bg-transparent"
                />
                <div className="text-xs mt-1">First date of employment</div>
              </div>
              
              <div className="p-2">
                <input
                  type="text"
                  name="ein"
                  value={formData.ein}
                  onChange={handleInputChange}
                  className="w-full border-b border-dotted border-black bg-transparent"
                />
                <div className="text-xs mt-1">Employer identification number (EIN)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between p-2 text-xs">
        <div>For Privacy Act and Paperwork Reduction Act Notice, see page 3.</div>
        <div className="flex items-center gap-1">
          <div>Cat. No. 102200</div>
          <div className="ml-4">Form W-4 (2025)</div>
        </div>
      </div>
    </div>
  );
};