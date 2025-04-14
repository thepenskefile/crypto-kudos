import * as React from "react";
import { createContext, useContext } from "react";
import { cn } from "../../utils/cn";

interface TabContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

interface TabContainerProps {
  children: React.ReactNode;
  defaultValue?: string;
  className?: string;
}

interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabPanelProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabContentProps {
  children: React.ReactNode;
  className?: string;
}

export function useTab() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTab must be used within a TabContainer");
  }
  return context;
}

export function TabContainer({
  children,
  defaultValue,
  className = "",
}: TabContainerProps) {
  const [activeTab, setActiveTab] = React.useState(defaultValue || "");

  const value = React.useMemo(
    () => ({
      activeTab,
      setActiveTab,
    }),
    [activeTab]
  );

  return (
    <TabContext.Provider value={value}>
      <div
        className={cn(
          "bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden",
          className
        )}
        role="tablist"
      >
        {children}
      </div>
    </TabContext.Provider>
  );
}

export function TabList({ children, className = "" }: TabListProps) {
  return (
    <div
      className={cn(
        "flex gap-1 p-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700",
        className
      )}
      role="tablist"
    >
      {children}
    </div>
  );
}

export function TabTrigger({
  value,
  children,
  className = "",
}: TabTriggerProps) {
  const { activeTab, setActiveTab } = useTab();
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${value}`}
      id={`tab-${value}`}
      onClick={() => setActiveTab(value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setActiveTab(value);
        }
      }}
      className={cn(
        "px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer",
        isActive
          ? "bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm"
          : "text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:text-purple-600 dark:hover:text-purple-400",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabPanel({ value, children, className = "" }: TabPanelProps) {
  const { activeTab } = useTab();
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      id={`panel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={cn("p-6", className)}
    >
      {children}
    </div>
  );
}

export function TabContent({ children, className = "" }: TabContentProps) {
  return <div className={className}>{children}</div>;
}

export const Tab = {
  Container: TabContainer,
  List: TabList,
  Trigger: TabTrigger,
  Panel: TabPanel,
  Content: TabContent,
  useTab,
};
