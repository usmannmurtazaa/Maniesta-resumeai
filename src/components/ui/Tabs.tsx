import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface TabsContextValue {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const TabsContext = createContext<TabsContextValue>({
  activeTab: 0,
  setActiveTab: () => {},
});

export function Tabs({ children, className }: { children: React.ReactNode; className?: string }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn('relative border-b border-gray-200', className)}>
      <div className="flex space-x-1 overflow-x-auto no-scrollbar">
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child;
          const isActive = index === activeTab;
          return React.cloneElement(child as React.ReactElement<any>, {
            isActive,
            onClick: () => setActiveTab(index),
          });
        })}
      </div>

      {/* Animated underline indicator */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute bottom-0 h-0.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-400"
          layoutId="tab-indicator"
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          style={{
            width: `${100 / React.Children.count(children)}%`,
            left: `${(activeTab * 100) / React.Children.count(children)}%`,
          }}
        />
      )}
    </div>
  );
}

export function Tab({
  children,
  isActive,
  onClick,
  icon,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
      className={cn(
        'flex items-center justify-center gap-2 whitespace-nowrap px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1',
        isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/80'
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}

export function TabPanel({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== index) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn('py-4', className)}
      role="tabpanel"
    >
      {children}
    </motion.div>
  );
}
