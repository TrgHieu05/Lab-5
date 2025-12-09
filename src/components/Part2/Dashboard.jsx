import React, { useState, useMemo, useCallback } from 'react'
import ListItem from './ListItem'

// Generate initial items
const generateItems = (count) => {
    const emojis = ['🎨', '🚀', '💎', '🌟', '🔥', '⚡', '🎯', '💡', '🎪', '🌈']
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        emoji: emojis[i % emojis.length],
        value: Math.floor(Math.random() * 1000),
    }))
}

function Dashboard() {
    // State
    const [items, setItems] = useState(() => generateItems(100)) // Using 100 items for demo
    const [isDarkTheme, setIsDarkTheme] = useState(true)
    const [sortOrder, setSortOrder] = useState('asc')
    const [renderCount, setRenderCount] = useState(0)

    // Track component renders
    React.useEffect(() => {
        setRenderCount(prev => prev + 1)
    })

    // useMemo: Only recalculates when items or sortOrder changes
    // NOT when theme changes
    const sortedItems = useMemo(() => {
        console.log('🔄 Sorting items... (this should NOT run when theme changes)')
        const sorted = [...items].sort((a, b) => {
            return sortOrder === 'asc' ? a.value - b.value : b.value - a.value
        })
        return sorted
    }, [items, sortOrder])

    // useCallback: Stable function reference for memoized children
    // Without this, ListItem would re-render on every parent render
    const handleDelete = useCallback((id) => {
        console.log(`🗑️ Deleting item ${id}`)
        setItems(prevItems => prevItems.filter(item => item.id !== id))
    }, [])

    const toggleTheme = () => {
        console.log('🎨 Theme toggled - ListItems should NOT re-render')
        setIsDarkTheme(prev => !prev)
    }

    const toggleSort = () => {
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    }

    const resetItems = () => {
        setItems(generateItems(100))
    }

    return (
        <div className="exercise-card">
            <h3 className="exercise-title">Exercise 2.1 & 2.2: Performance Optimization</h3>
            <p className="exercise-description">
                Demonstrates useMemo (sorting), React.memo (ListItem), and useCallback (handleDelete).
                Toggle the theme and watch the console - items should NOT re-render!
            </p>

            {/* Dashboard Header */}
            <div className="dashboard-header" style={{
                background: isDarkTheme ? 'var(--bg-card)' : '#f0f0f0',
                color: isDarkTheme ? 'var(--text-primary)' : '#333'
            }}>
                <div className="flex items-center gap-2">
                    <span>Theme: {isDarkTheme ? '🌙 Dark' : '☀️ Light'}</span>
                    <div
                        className={`toggle-switch ${isDarkTheme ? 'active' : ''}`}
                        onClick={toggleTheme}
                    ></div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm">Dashboard renders: <strong>{renderCount}</strong></span>
                    <button onClick={toggleSort} className="btn btn-secondary btn-sm">
                        Sort: {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
                    </button>
                    <button onClick={resetItems} className="btn btn-secondary btn-sm">
                        Reset Items
                    </button>
                </div>
            </div>

            {/* Info Boxes */}
            <div className="flex gap-2 mb-2">
                <div className="card" style={{ flex: 1 }}>
                    <h4>🧠 useMemo</h4>
                    <p className="text-sm text-muted">
                        Sorting only recalculates when items or sortOrder changes, not when theme changes.
                    </p>
                </div>
                <div className="card" style={{ flex: 1 }}>
                    <h4>📦 React.memo</h4>
                    <p className="text-sm text-muted">
                        ListItem components only re-render when their specific props change.
                    </p>
                </div>
                <div className="card" style={{ flex: 1 }}>
                    <h4>🔗 useCallback</h4>
                    <p className="text-sm text-muted">
                        handleDelete has stable reference, preventing child re-renders.
                    </p>
                </div>
            </div>

            {/* List Container */}
            <div className="list-container">
                {sortedItems.slice(0, 20).map(item => (
                    <ListItem
                        key={item.id}
                        item={item}
                        onDelete={handleDelete}
                    />
                ))}
                {sortedItems.length > 20 && (
                    <div className="text-center text-muted" style={{ padding: '1rem' }}>
                        Showing 20 of {sortedItems.length} items for performance
                    </div>
                )}
            </div>

            {/* Console Instructions */}
            <div className="event-log mt-2">
                <p>📋 Open browser DevTools console to see render logs:</p>
                <p className="text-sm">• Toggle theme → No "ListItem rendered" logs</p>
                <p className="text-sm">• Change sort order → Items re-render (expected)</p>
                <p className="text-sm">• Delete item → Only remaining items stay</p>
            </div>
        </div>
    )
}

export default Dashboard
