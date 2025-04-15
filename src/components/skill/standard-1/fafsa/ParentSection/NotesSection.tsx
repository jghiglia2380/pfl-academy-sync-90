interface NotesSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

const NotesSection = ({ formData, setFormData }: NotesSectionProps) => {
  // Handle note changes and update global form state
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      notes: e.target.value,
    }));
  };

  return (
    <div className="border border-purple-900 p-4">
      <h3 className="font-bold text-purple-900 mb-2">NOTES:</h3>
      <textarea
        value={formData.notes || ""} // Pre-fill notes from global form state
        onChange={handleNotesChange} // Update global state on change
        className="w-full h-32 p-2 border border-gray-300 rounded"
        placeholder="Enter your notes here..."
      />
    </div>
  );
};

export default NotesSection;
