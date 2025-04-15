import PersonalInfoForm from "../forms/PersonalInfoForm";
import ContactInfoForm from "../forms/ContactInfoForm";
import EmploymentInfoForm from "../forms/EmploymentInfoForm";
import AccountInfoForm from "../forms/AccountInfoForm";
import CitizenshipForm from "../forms/CitizenshipForm";
import BackupWithholdingForm from "../forms/BackupWithholdingForm";
import TermsForm from "../forms/TermsForm";

export default function FormSection({
  title,
  description,
  type,
  data,
  onChange,
  isGuardian,
}) {
  return (
    <div
      className={`md:w-1/2 w-full p-4 ${
        isGuardian ? "" : "border-r border-gray-200"
      }`}
    >
      <div className="mb-8 h-[80px]">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>

      <div className="space-y-8">
        <PersonalInfoForm
          data={data.personalInfo}
          onChange={(newData) => {
            onChange({
              ...data,
              personalInfo: { ...data.personalInfo, ...newData },
            });
          }}
          type={type}
        />

        <ContactInfoForm
          data={data.personalInfo}
          onChange={(newData) => {
            onChange({
              ...data,
              personalInfo: { ...data.personalInfo, ...newData },
            });
          }}
          isGuardian={isGuardian}
        />

        <EmploymentInfoForm
          data={data.employmentInfo}
          onChange={(newData) => {
            onChange({
              ...data,
              employmentInfo: { ...data.employmentInfo, ...newData },
            });
          }}
        />

        <CitizenshipForm
          citizenship={data.personalInfo.citizenship}
          onChange={(citizenship) => {
            onChange({
              ...data,
              personalInfo: { ...data.personalInfo, citizenship },
            });
          }}
        />

        <BackupWithholdingForm
          isSubjectToWithholding={data.personalInfo.isSubjectToWithholding}
          onChange={(isSubjectToWithholding) => {
            onChange({
              ...data,
              personalInfo: { ...data.personalInfo, isSubjectToWithholding },
            });
          }}
        />

        <TermsForm
          agreed={data.personalInfo.termsAgreed || false}
          onChange={(termsAgreed) => {
            onChange({
              ...data,
              personalInfo: { ...data.personalInfo, termsAgreed },
            });
          }}
        />

        {!isGuardian && (
          <AccountInfoForm
            data={data.accountInfo}
            onChange={(newData) => {
              onChange({
                ...data,
                accountInfo: { ...data.accountInfo, ...newData },
              });
            }}
          />
        )}
      </div>
    </div>
  );
}
