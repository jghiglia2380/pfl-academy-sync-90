interface OtherAdjustmentsProps {
  formData: {
    otherIncome: string;
    deductions: string;
    extraWithholding: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const OtherAdjustments = ({ formData, handleInputChange }: OtherAdjustmentsProps) => {
  return (
    <div className="border-b border-black">
      <div className="flex">
        <div className="w-1/6 font-bold border-r border-black p-2">
          Step 4<br />
          (optional):<br />
          Other<br />
          Adjustments
        </div>
        
        <div className="flex-1 p-2">
          <div className="space-y-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs">(a)</span>
                <div className="flex-1">
                  <span className="text-xs">Other income (not from jobs). If you want tax withheld for other income you
                    expect this year that won't have withholding, enter the amount of other income here.
                    This may include interest, dividends, and retirement income</span>
                  <div className="flex justify-end items-center mt-1">
                    <span className="text-xs mr-2">4(a)</span>
                    <span className="text-sm">$</span>
                    <input
                      type="text"
                      name="otherIncome"
                      value={formData.otherIncome}
                      onChange={handleInputChange}
                      className="w-20 border-b border-dotted border-black bg-transparent text-right"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs">(b)</span>
                <div className="flex-1">
                  <span className="text-xs">Deductions. If you expect to claim deductions other than the standard deduction and
                    want to reduce your withholding, use the Deductions Worksheet on page 3 and enter
                    the result here</span>
                  <div className="flex justify-end items-center mt-1">
                    <span className="text-xs mr-2">4(b)</span>
                    <span className="text-sm">$</span>
                    <input
                      type="text"
                      name="deductions"
                      value={formData.deductions}
                      onChange={handleInputChange}
                      className="w-20 border-b border-dotted border-black bg-transparent text-right"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs">(c)</span>
                <div className="flex-1">
                  <span className="text-xs">Extra withholding. Enter any additional tax you want withheld each pay period</span>
                  <div className="flex justify-end items-center mt-1">
                    <span className="text-xs mr-2">4(c)</span>
                    <span className="text-sm">$</span>
                    <input
                      type="text"
                      name="extraWithholding"
                      value={formData.extraWithholding}
                      onChange={handleInputChange}
                      className="w-20 border-b border-dotted border-black bg-transparent text-right"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};