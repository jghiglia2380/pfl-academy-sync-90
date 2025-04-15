import { useEffect, useState } from "react";

export function CitizenshipStatus({ formData, setFormData }) {
  const [citizenship, setCitizenship] = useState(formData.citizenship || "");
  const [alienRegNumber, setAlienRegNumber] = useState(
    formData.alienRegNumber || ""
  );

  // Update formData when citizenship status changes
  const handleCitizenshipChange = (value) => {
    setCitizenship(value);
    setFormData((prev) => ({ ...prev, citizenship: value }));
  };

  // Update Alien Registration Number
  const handleAlienChange = (e, index) => {
    const newNumber = alienRegNumber.split("");
    newNumber[index] = e.target.value;
    const updatedNumber = newNumber.join("");

    setAlienRegNumber(updatedNumber);
    setFormData((prev) => ({ ...prev, alienRegNumber: updatedNumber }));
  };

  // Prefill the state when formData changes (useful when loading from Supabase)
  useEffect(() => {
    setCitizenship(formData.citizenship || "");
    setAlienRegNumber(formData.alienRegNumber || "");
  }, [formData]);

  return (
    <div className="section-box">
      <div className="section-title">
        Student Citizenship Status (check one of the following)
      </div>

      <div className="alien-registration">
        <div className="font-bold">Your Alien Registration Number</div>
        <div className="alien-grid">
          <div className="alien-box">A</div>
          {[...Array(8)].map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className="alien-box"
              value={alienRegNumber[i] || ""}
              onChange={(e) => handleAlienChange(e, i)}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="checkbox-label">
          <input
            type="radio"
            name="citizenship"
            checked={citizenship === "us-citizen"}
            onChange={() => handleCitizenshipChange("us-citizen")}
          />
          U.S. citizen (U.S. national)
        </label>
      </div>

      <div>
        <label className="checkbox-label">
          <input
            type="radio"
            name="citizenship"
            checked={citizenship === "neither"}
            onChange={() => handleCitizenshipChange("neither")}
          />
          Neither citizen nor eligible noncitizen
        </label>
      </div>

      <div>
        <label className="checkbox-label">
          <input
            type="radio"
            name="citizenship"
            checked={citizenship === "eligible-noncitizen"}
            onChange={() => handleCitizenshipChange("eligible-noncitizen")}
          />
          Eligible noncitizen (Enter your Alien Registration Number in the box
          to the right.)
        </label>
      </div>

      <div className="mt-4">
        <div className="font-bold">
          Generally, you are an eligible noncitizen if you are:
        </div>
        <ul className="list-disc ml-6 mt-2">
          <li>
            A permanent U.S. resident with a Permanent Resident Card (I-551);
          </li>
          <li>
            A conditional permanent resident with a Conditional Green Card
            (I-551C);
          </li>
          <li>
            The holder of an Arrival-Departure Record (I-94) from the Department
            of Homeland Security showing any of the following designations:
            "Refugee," "Asylum Granted," "Parolee" (I-94 confirms paroled for a
            minimum of one year and status has not expired), T-Visa holder (T-1,
            T-2, T-3, etc.) or "Cuban-Haitian Entrant;" or
          </li>
          <li>
            The holder of a valid certification or eligibility letter from the
            Department of Health and Human Services showing a designation of
            "Victim of human trafficking."
          </li>
        </ul>
      </div>
    </div>
  );
}
