import React, { createContext, useContext, useState } from 'react'

// Create Context for sharing state between compound components
const TabsContext = createContext(null)

// Custom hook to access Tabs context
function useTabsContext() {
    const context = useContext(TabsContext)
    if (!context) {
        throw new Error('Tabs compound components must be used within a Tabs component')
    }
    return context
}

// Main Tabs component - holds state and provides context
function Tabs({ children, defaultIndex = 0 }) {
    const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex)

    const value = {
        activeTabIndex,
        setActiveTabIndex,
    }

    return (
        <TabsContext.Provider value={value}>
            <div className="tabs-container">
                {children}
            </div>
        </TabsContext.Provider>
    )
}

// Tabs.List - wraps the tab buttons
function TabsList({ children }) {
    return (
        <div className="tabs-list" role="tablist">
            {children}
        </div>
    )
}

// Tabs.Tab - individual tab button
function Tab({ children, index }) {
    const { activeTabIndex, setActiveTabIndex } = useTabsContext()
    const isActive = activeTabIndex === index

    return (
        <button
            className={`tab-button ${isActive ? 'active' : ''}`}
            role="tab"
            aria-selected={isActive}
            onClick={() => setActiveTabIndex(index)}
        >
            {children}
        </button>
    )
}

// Tabs.Panel - content panel for each tab
function TabPanel({ children, index }) {
    const { activeTabIndex } = useTabsContext()

    if (activeTabIndex !== index) {
        return null
    }

    return (
        <div className="tab-panel" role="tabpanel">
            {children}
        </div>
    )
}

// Attach sub-components to Tabs
Tabs.List = TabsList
Tabs.Tab = Tab
Tabs.Panel = TabPanel

export default Tabs
