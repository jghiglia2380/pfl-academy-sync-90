export function StudentInfo() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <label htmlFor="lastName" className="block font-bold">Student's Last Name</label>
        <input
          type="text"
          id="lastName"
          className="w-full border border-gray-300 p-2"
        />
      </div>
      <div>
        <label htmlFor="firstName" className="block font-bold">First Name</label>
        <input
          type="text"
          id="firstName"
          className="w-full border border-gray-300 p-2"
        />
      </div>
      <div>
        <label htmlFor="ssn" className="block font-bold">Social Security Number</label>
        <input
          type="text"
          id="ssn"
          className="w-full border border-gray-300 p-2"
          maxLength={9}
        />
      </div>
    </div>
  );
}