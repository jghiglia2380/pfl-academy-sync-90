interface DependentsProps {
  formData: {
    dependentChildren: string;
    otherDependents: string;
    qualifyingDependents: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Dependents = ({
  formData,
  handleInputChange,
}: DependentsProps) => {
  return (
    <div className="border-b border-black">
      <div className="flex">
        <div className="w-1/6 font-bold border-r border-black p-2">
          Step 3:
          <br />
          Claim
          <br />
          Dependent
          <br />
          and Other
          <br />
          Credits
        </div>

        <div className="flex-1 p-2">
          <div className="text-xs mb-2">
            If your total income will be $200,000 or less ($400,000 or less if
            married filing jointly):
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs">
              Multiply the number of qualifying children under age 17 by $2,000
            </span>
            <span className="text-sm">$</span>
            <input
              type="number"
              name="dependentChildren"
              value={formData.dependentChildren}
              onChange={handleInputChange}
              className="w-20 border-b border-dotted border-black bg-transparent text-right"
            />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs">
              Multiply the number of other dependents by $500
            </span>
            <span className="text-sm">$</span>
            <input
              type="number"
              name="otherDependents"
              value={formData.otherDependents}
              onChange={handleInputChange}
              className="w-20 border-b border-dotted border-black bg-transparent text-right"
            />
          </div>

          <div className="flex items-center">
            <span className="text-xs">
              Add the amounts above for qualifying children and other
              dependents. You may add to this the amount of any other credits.
              Enter the total here
            </span>
            <span className="flex-grow"></span>
            <span className="text-sm">$</span>
            <input
              type="number"
              name="qualifyingDependents"
              value={formData.qualifyingDependents}
              onChange={handleInputChange}
              className="w-20 border-b border-dotted border-black bg-transparent text-right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
