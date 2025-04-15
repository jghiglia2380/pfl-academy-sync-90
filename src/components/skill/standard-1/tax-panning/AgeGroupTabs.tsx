import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import ChecklistSection from "./ChecklistSection";

export default function AgeGroupTabs({ groups, formData, setFormData }) {
  if (!groups || groups.length === 0) return null; // Prevent rendering issues

  // Ensure formData has a selectedTab, default to the first group
  const activeTab = formData.selectedTab || groups[0].id;

  // Handle tab change and store it in global state
  const handleTabChange = (newTab) => {
    setFormData((prev) => ({
      ...prev,
      selectedTab: newTab, // Persist selected tab globally
    }));
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      {/* Tabs List (Triggers) */}
      <TabsList className="grid w-full grid-cols-2">
        {groups.map((group) => (
          <TabsTrigger
            key={group.id}
            value={group.id}
            style={{ color: group.accentColor }}
          >
            {group.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tabs Content (Only render the active one) */}
      {groups.map((group) => (
        <TabsContent key={group.id} value={group.id}>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: group.accentColor }}
              >
                {group.title}
              </h2>
              <p className="text-gray-600 mb-6">{group.description}</p>

              {group.sections.map((section) => (
                <ChecklistSection
                  key={section.id}
                  section={section}
                  accentColor={group.accentColor}
                  formData={formData}
                  setFormData={setFormData}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
