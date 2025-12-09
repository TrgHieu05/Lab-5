import React, { memo } from 'react'

// Wrapped with React.memo to prevent unnecessary re-renders
// Only re-renders when its props actually change
const ListItem = memo(function ListItem({ item, onDelete }) {
    // This log helps demonstrate when the component re-renders
    console.log(`📦 ListItem ${item.id} rendered`)

    return (
        <div className="list-item">
            <div className="flex items-center gap-2">
                <span style={{ fontSize: '1.5rem' }}>{item.emoji}</span>
                <div>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div className="text-sm text-muted">Value: {item.value}</div>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className="render-indicator">Last render: {new Date().toLocaleTimeString()}</span>
                <button
                    onClick={() => onDelete(item.id)}
                    className="btn btn-danger btn-sm"
                >
                    Delete
                </button>
            </div>
        </div>
    )
})

export default ListItem
