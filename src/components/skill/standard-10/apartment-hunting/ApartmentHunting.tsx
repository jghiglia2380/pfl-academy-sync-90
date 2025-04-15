import { useEffect, useState } from "react";
import {
  Building2,
  Car,
  DollarSign,
  Home,
  MapPin,
  Dog,
  Ruler,
  Shirt,
  ThermometerSun,
} from "lucide-react";
import ComparisonTable from "./ComparisonTable";
import Checklist from "./Checklist";
import Header from "./Header";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";

function ApartmentHunting({
  section,
  onExerciseComplete,
  formData,
  setFormData,
}) {
  const [loadingAi, setLoadingAi] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // Initialize formData with default values if not present
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      apartments: prev.apartments || section.apartmentsData,
      selectedApartment: prev.selectedApartment || null,
      reflection: prev.reflection || "",
    }));
  }, []);

  useEffect(() => {
    if (formData.reflection && formData.aiResponse) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
    console.log(formData);
  }, [formData]);

  // Updates apartment comparison data
  const updateApartment = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      apartments: prev.apartments?.map((apt) =>
        apt.id === id ? { ...apt, [field]: value } : apt
      ),
    }));
  };

  // Feature checklist options
  const features = [
    { icon: <Home className="w-5 h-5" />, label: "Must-Have Features" },
    { icon: <Building2 className="w-5 h-5" />, label: "Location & Building" },
    { icon: <DollarSign className="w-5 h-5" />, label: "Budget & Utilities" },
    { icon: <Ruler className="w-5 h-5" />, label: "Size & Layout" },
    {
      icon: <ThermometerSun className="w-5 h-5" />,
      label: "Comfort & Amenities",
    },
    { icon: <Car className="w-5 h-5" />, label: "Parking & Transportation" },
    { icon: <Dog className="w-5 h-5" />, label: "Pet Policy" },
    { icon: <MapPin className="w-5 h-5" />, label: "Proximity to Work/School" },
    { icon: <Shirt className="w-5 h-5" />, label: "Laundry Facilities" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, reflection: e.target.value });
    setWordCount(e.target.value.split(/\s/).filter((w) => w !== "").length);
  };

  const handleSubmit = async () => {
    if (wordCount < 15) {
      toast.warning("Please write at least 15 words before submitting.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
    setLoadingAi(true);
    const response = await generateAiResponse(
      formData.reflection,
      `
      Apartment Hunting Checklist.Compare rental options and track your apartment search.
      User apartments: ${JSON.stringify(formData.apartments)}.
      User checklist: ${JSON.stringify(formData.checklist)}.
      Based on your comparison, write a brief explanation of your choice:
      `
    );
    setLoadingAi(false);

    setFormData({ ...formData, aiResponse: response });
  };

  // Handle revise action
  const handleRevise = () => {
    setFormData({ ...formData, reflection: "", aiResponse: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-2">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
          {/* Checklist Section */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow p-2">
              <h2 className="text-lg font-semibold mb-4">Your Checklist</h2>
              <Checklist
                features={features}
                formData={formData}
                setFormData={setFormData}
              />
            </div>
          </div>

          {/* Comparison Table Section */}
          <div className="md:col-span-9">
            <div className="bg-white rounded-lg shadow p-2">
              <h2 className="text-lg font-semibold mb-4">Compare Apartments</h2>
              <ComparisonTable
                apartments={formData.apartments}
                updateApartment={updateApartment}
                selectedApartment={formData.selectedApartment}
                setSelectedApartment={(id) =>
                  setFormData((prev) => ({ ...prev, selectedApartment: id }))
                }
              />

              {/* Reflection Section */}
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-2">Your Decision</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Based on your comparison, write a brief explanation of your
                  choice:
                </p>
                <textarea
                  value={formData.reflection}
                  onChange={handleChange}
                  className="w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Explain which apartment best fits your needs and why..."
                />
                {formData.reflection && formData.aiResponse ? (
                  <div>
                    <div className="flex w-full mb-4">
                      <button
                        onClick={handleRevise}
                        className="bg-indigo-600 w-full text-white px-4 py-2 rounded hover:bg-indigo-700"
                      >
                        Revise Response
                      </button>
                    </div>
                    {/* AI Response Box */}
                    {loadingAi ? (
                      <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mt-4">
                        <p className="text-gray-700">
                          Generating AI feedback...
                        </p>
                      </div>
                    ) : (
                      formData.aiResponse && (
                        <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mt-4">
                          <h4 className="text-lg font-bold text-gray-900">
                            AI Feedback
                          </h4>
                          <p className="text-gray-700 mt-2">
                            {formData.aiResponse}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loadingAi}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500"
                  >
                    {loadingAi
                      ? "Generating AI response..."
                      : "Submit Reflection"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ApartmentHunting;
