import React, { useRef } from 'react';
import { Upload, FileText } from 'lucide-react';

const DocumentSection = ({
  title,
  description,
  section,
  formData,
  handleInputChange,
  handleImageUpload,
}) => {
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const importanceRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
        <FileText className="mr-2" />
        {title}
      </h2>
      <p className="text-gray-600 mb-6">{description}</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Screenshot
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">Click to upload image</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageUpload(section, e)}
              />
            </label>
          </div>
          {formData.screenshot && (
            <img
              src={formData.screenshot}
              alt={`${title} preview`}
              className="mt-4 max-w-md rounded-lg shadow-sm"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            ref={descriptionRef}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={formData.description}
            onChange={(e) => {
              handleInputChange(section, 'description', e.target.value);
              descriptionRef.current?.focus();
            }}
            placeholder="Provide a brief description..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Importance
          </label>
          <textarea
            ref={importanceRef}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            value={formData.importance}
            onChange={(e) => {
              handleInputChange(section, 'importance', e.target.value);
              importanceRef.current?.focus();
            }}
            placeholder="Explain why this document is important..."
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentSection;
