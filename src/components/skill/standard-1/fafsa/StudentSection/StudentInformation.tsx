import { SSNInput } from "./SSNInput";
import { Scenarios } from "./Scenarios";
import { CitizenshipStatus } from "./CitizenshipStatus";
import { MaritalStatus } from "./MaritalStatus";
import { ParentEducation } from "./ParentEducation";

export function StudentInformationSection({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); // 🔹 Update global state
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Scenarios randomScenario={formData?.scenario} />
      <div className="form-container">
        <div className="section-header">
          <h1>SECTION 1 - STUDENT INFORMATION</h1>
        </div>

        <div className="info-box">
          After you are online, you can add up to ten colleges on your FAFSA
          form. The colleges will receive the information from your processed
          FAFSA form.
        </div>

        <div className="input-grid">
          <div>
            <div className="font-bold mb-2">Student's Last Name</div>
            <input
              type="text"
              name="lastName"
              value={formData?.lastName ?? ""}
              onChange={handleChange}
              className="w-full border border-black p-1"
            />
          </div>
          <div>
            <div className="font-bold mb-2">First Name</div>
            <input
              type="text"
              name="firstName"
              value={formData?.firstName ?? ""}
              onChange={handleChange}
              className="w-full border border-black p-1"
            />
          </div>
          <div>
            <div className="font-bold mb-2">Social Security Number</div>
            <SSNInput
              value={formData.ssn || ""}
              onChange={(ssn) => setFormData((prev) => ({ ...prev, ssn }))}
            />
          </div>
        </div>

        <CitizenshipStatus formData={formData} setFormData={setFormData} />
        <MaritalStatus formData={formData} setFormData={setFormData} />
        <ParentEducation formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
}
