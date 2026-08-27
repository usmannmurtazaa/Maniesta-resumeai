import React, { createContext, useContext, useState } from 'react';
import { cn } from '@/utils/cn';

interface TabsContextValue {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const TabsContext = createContext<TabsContextValue>({
  activeTab: 0,
  setActiveTab: () => {},
});

export function Tabs({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabList({ children }: { children: React.ReactNode }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <div className="border-b border-gray-200">
      <div className="flex space-x-4">
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child as React.ReactElement, {
            isActive: index === activeTab,
            onClick: () => setActiveTab(index),
          })
        )}
      </div>
    </div>
  );
}

export function Tab({
  children,
  isActive,
  onClick,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'py-2 px-1 text-sm font-medium border-b-2 -mb-px',
        isActive
          ? 'border-primary-600 text-primary-600'
          : 'border-transparent text-gray-500 hover:text-gray-700'
      )}
    >
      {children}
    </button>
  );
}

export function TabPanel({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const { activeTab } = useContext(TabsContext);
  return activeTab === index ? <div className="py-4">{children}</div> : null;
}