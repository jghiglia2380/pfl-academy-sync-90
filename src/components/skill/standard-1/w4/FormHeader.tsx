export const FormHeader = () => {
  return (
    <div className="border-b border-black">
      <div className="flex items-start">
        {/* Left Section */}
        <div className="w-1/4 pr-4 border-r border-black">
          <div className="flex items-baseline gap-2">
            <span className="text-sm">Form</span>
            <span className="text-4xl font-bold">W-4</span>
          </div>
          <div className="text-[10px] leading-tight mt-1">
            Department of the Treasury<br />
            Internal Revenue Service
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex-1 px-4 border-r border-black">
          <div className="text-center">
            <div className="font-bold text-lg">Employee's Withholding Certificate</div>
            <div className="text-xs mt-1 leading-tight">
              Complete Form W-4 so that your employer can withhold the correct federal income tax from your pay.<br />
              Give Form W-4 to your employer.<br />
              Your withholding is subject to review by the IRS.
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/4 pl-4 text-right">
          <div className="text-xs">OMB No. 1545-0074</div>
          <div className="mt-1">
            <span className="text-2xl font-bold tracking-wider">
              <span className="text-white stroke-black stroke-2">20</span>
              25
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};