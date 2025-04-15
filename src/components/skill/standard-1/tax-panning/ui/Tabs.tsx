import React, { createContext, useContext } from "react";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  value: string; // ✅ Make Tabs fully controlled
  onValueChange: (value: string) => void; // ✅ External state updater
  className?: string;
  children: React.ReactNode;
}

export function Tabs({
  value,
  onValueChange,
  className = "",
  children,
}: TabsProps) {
  return (
    <TabsContext.Provider
      value={{ activeTab: value, setActiveTab: onValueChange }}
    >
      <div className={`w-full ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

export function TabsList({ className = "", children }: TabsListProps) {
  return <div className={`flex space-x-2 mb-4 ${className}`}>{children}</div>;
}

interface TabsTriggerProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export function TabsTrigger({
  value,
  className = "",
  children,
}: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context)
    throw new Error("TabsTrigger must be used within a Tabs component.");

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
      } ${className}`}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export function TabsContent({ value, children }: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context)
    throw new Error("TabsContent must be used within a Tabs component.");

  const { activeTab } = context;

  return activeTab === value ? <div>{children}</div> : null;
}
