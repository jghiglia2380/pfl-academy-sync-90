interface PersonalInfoProps {
  formData: {
    firstName: string;
    lastName: string;
    address: string;
    cityStateZip: string;
    ssn: string;
    filingStatus: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PersonalInfo = ({
  formData,
  handleInputChange,
}: PersonalInfoProps) => {
  // Format SSN input with dashes
  const handleSsnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(
      /^(\d{3})(\d{2})(\d{4}).*/,
      "$1-$2-$3"
    );

    handleInputChange({
      ...e,
      target: {
        name: "ssn",
        value: formattedValue,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="border-b border-black">
      <div className="flex">
        <div className="w-1/6 font-bold border-r border-black p-2">
          Step 1:
          <br />
          Enter
          <br />
          Personal
          <br />
          Information
        </div>

        <div className="flex-1">
          {/* Name and SSN row */}
          <div className="flex border-b border-black">
            <div className="w-1/3 p-2 border-r border-black">
              <div className="text-xs">(a) First name and middle initial</div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full border-b border-dotted border-black bg-transparent"
              />
            </div>
            <div className="w-1/3 p-2 border-r border-black">
              <div className="text-xs">Last name</div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full border-b border-dotted border-black bg-transparent"
              />
            </div>
            <div className="w-1/3 p-2">
              <div className="text-xs">(b) Social security number</div>
              <input
                type="text"
                name="ssn"
                value={formData.ssn}
                onChange={handleSsnChange}
                maxLength={11}
                placeholder="XXX-XX-XXXX"
                className="w-full border-b border-dotted border-black bg-transparent"
              />
            </div>
          </div>

          {/* SSN verification note */}
          <div className="border-b border-black p-2">
            <div className="text-xs leading-tight">
              Does your name match the name on your social security card? If
              not, to ensure you get credit for your earnings, contact SSA at
              800-772-1213 or go to www.ssa.gov.
            </div>
          </div>

          {/* Address */}
          <div className="border-b border-black p-2">
            <div className="text-xs">Address</div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full border-b border-dotted border-black bg-transparent"
            />
          </div>

          {/* City, State, ZIP */}
          <div className="border-b border-black p-2">
            <div className="text-xs">City or town, state, and ZIP code</div>
            <input
              type="text"
              name="cityStateZip"
              value={formData.cityStateZip}
              onChange={handleInputChange}
              className="w-full border-b border-dotted border-black bg-transparent"
            />
          </div>

          {/* Filing Status */}
          <div className="p-2">
            <div className="text-xs">(c)</div>
            <div className="space-y-1 mt-1">
              <label className="flex items-start gap-2">
                <input
                  type="radio"
                  name="filingStatus"
                  value="single"
                  checked={formData.filingStatus === "single"}
                  onChange={handleInputChange}
                  className="mt-1"
                />
                <span className="text-sm">
                  Single or Married filing separately
                </span>
              </label>
              <label className="flex items-start gap-2">
                <input
                  type="radio"
                  name="filingStatus"
                  value="married"
                  checked={formData.filingStatus === "married"}
                  onChange={handleInputChange}
                  className="mt-1"
                />
                <span className="text-sm">
                  Married filing jointly or Qualifying surviving spouse
                </span>
              </label>
              <label className="flex items-start gap-2">
                <input
                  type="radio"
                  name="filingStatus"
                  value="head"
                  checked={formData.filingStatus === "head"}
                  onChange={handleInputChange}
                  className="mt-1"
                />
                <span className="text-sm">
                  Head of household (Check only if you're unmarried and pay more
                  than half the costs of keeping up a home for yourself and a
                  qualifying individual.)
                </span>
              </label>
            </div>
          </div>

          {/* TIP section */}
          <div className="text-xs p-4 border-t border-black leading-tight">
            <div className="font-bold inline">TIP:</div> Consider using the
            estimator at www.irs.gov/W4App to determine the most accurate
            withholding for the rest of the year if: you are completing this
            form after the beginning of the year, expect to work only part of
            the year, or have changes during the year in your marital status,
            number of jobs for you (and/or your spouse if married filing
            jointly), dependents, other income (not from jobs), deductions, or
            credits. Have your most recent pay stub(s) from this year available
            when using the estimator. At the beginning of next year, use the
            estimator again to recheck your withholding.
          </div>
        </div>
      </div>
    </div>
  );
};
