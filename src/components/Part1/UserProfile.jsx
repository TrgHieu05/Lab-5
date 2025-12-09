import React, { useReducer, useEffect } from 'react'

// Initial state following Finite State Machine pattern
// status: 'idle' | 'loading' | 'resolved' | 'rejected'
const initialState = {
    status: 'idle',
    data: null,
    error: null,
}

// Reducer with FSM pattern - prevents invalid transitions
function fetchReducer(state, action) {
    switch (action.type) {
        case 'FETCH_INIT':
            // Can only transition to loading from idle or rejected (retry)
            if (state.status === 'idle' || state.status === 'rejected' || state.status === 'resolved') {
                return { ...state, status: 'loading', error: null }
            }
            console.warn('⚠️ Invalid transition: Cannot start fetch while already loading')
            return state

        case 'FETCH_SUCCESS':
            // Can only succeed if currently loading
            if (state.status === 'loading') {
                return { status: 'resolved', data: action.payload, error: null }
            }
            console.warn('⚠️ Invalid transition: Cannot resolve unless loading')
            return state

        case 'FETCH_FAILURE':
            // Can only fail if currently loading
            if (state.status === 'loading') {
                return { status: 'rejected', data: null, error: action.payload }
            }
            console.warn('⚠️ Invalid transition: Cannot reject unless loading')
            return state

        case 'RESET':
            return initialState

        default:
            return state
    }
}

// Mock user data
const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Manager' },
]

function UserProfile() {
    const [state, dispatch] = useReducer(fetchReducer, initialState)
    const [userId, setUserId] = React.useState(1)
    const [shouldFail, setShouldFail] = React.useState(false)

    // Mock fetch function
    const fetchUser = async () => {
        dispatch({ type: 'FETCH_INIT' })

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        if (shouldFail) {
            dispatch({ type: 'FETCH_FAILURE', payload: 'Failed to fetch user data. Server error.' })
        } else {
            const user = mockUsers.find(u => u.id === userId)
            if (user) {
                dispatch({ type: 'FETCH_SUCCESS', payload: user })
            } else {
                dispatch({ type: 'FETCH_FAILURE', payload: 'User not found' })
            }
        }
    }

    const reset = () => {
        dispatch({ type: 'RESET' })
    }

    return (
        <div className="exercise-card">
            <h3 className="exercise-title">Exercise 1.1: The Fetch Machine (useReducer)</h3>
            <p className="exercise-description">
                Using useReducer with Finite State Machine pattern to manage fetch states.
                The reducer prevents invalid transitions (e.g., can't go to SUCCESS without LOADING first).
            </p>

            {/* Controls */}
            <div className="flex gap-2 mb-2">
                <select
                    value={userId}
                    onChange={(e) => setUserId(Number(e.target.value))}
                    className="btn btn-secondary"
                    style={{ cursor: 'pointer' }}
                >
                    <option value={1}>User 1: John Doe</option>
                    <option value={2}>User 2: Jane Smith</option>
                    <option value={3}>User 3: Bob Wilson</option>
                    <option value={99}>User 99: (Not Found)</option>
                </select>

                <label className="flex items-center gap-1">
                    <input
                        type="checkbox"
                        checked={shouldFail}
                        onChange={(e) => setShouldFail(e.target.checked)}
                    />
                    <span className="text-sm">Simulate Error</span>
                </label>
            </div>

            <div className="flex gap-1 mb-2">
                <button
                    onClick={fetchUser}
                    className="btn btn-primary"
                    disabled={state.status === 'loading'}
                >
                    {state.status === 'loading' ? 'Loading...' : 'Fetch User'}
                </button>
                <button onClick={reset} className="btn btn-secondary">
                    Reset
                </button>
            </div>

            {/* Status Display */}
            <div className="card mt-2">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-muted">Current Status:</span>
                    <span className={`status-badge status-${state.status}`}>
                        {state.status}
                    </span>
                </div>

                {/* State Machine Visualization */}
                <div className="text-sm text-muted mb-2">
                    State Flow:
                    <span style={{ color: state.status === 'idle' ? 'var(--accent-secondary)' : 'inherit' }}> idle</span>
                    {' → '}
                    <span style={{ color: state.status === 'loading' ? 'var(--warning)' : 'inherit' }}>loading</span>
                    {' → '}
                    <span style={{ color: state.status === 'resolved' ? 'var(--success)' : 'inherit' }}>resolved</span>
                    {' / '}
                    <span style={{ color: state.status === 'rejected' ? 'var(--danger)' : 'inherit' }}>rejected</span>
                </div>

                {/* Content based on state */}
                {state.status === 'idle' && (
                    <p className="text-muted">Click "Fetch User" to load user data...</p>
                )}

                {state.status === 'loading' && (
                    <div className="spinner-container" style={{ padding: '2rem' }}>
                        <div className="spinner"></div>
                        <p>Fetching user data...</p>
                    </div>
                )}

                {state.status === 'resolved' && state.data && (
                    <div className="user-profile">
                        <div className="user-avatar">
                            {state.data.name.charAt(0)}
                        </div>
                        <h4 className="user-name">{state.data.name}</h4>
                        <p className="user-email">{state.data.email}</p>
                        <span className="status-badge status-resolved">{state.data.role}</span>
                    </div>
                )}

                {state.status === 'rejected' && (
                    <div style={{ color: 'var(--danger)', textAlign: 'center', padding: '1rem' }}>
                        <p style={{ fontSize: '2rem' }}>⚠️</p>
                        <p>{state.error}</p>
                        <button onClick={fetchUser} className="btn btn-primary btn-sm mt-1">
                            Retry
                        </button>
                    </div>
                )}
            </div>

            {/* Code explanation */}
            <details className="mt-2">
                <summary className="text-muted" style={{ cursor: 'pointer' }}>View State Object</summary>
                <pre style={{
                    background: 'var(--bg-secondary)',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginTop: '0.5rem',
                    overflow: 'auto'
                }}>
                    {JSON.stringify(state, null, 2)}
                </pre>
            </details>
        </div>
    )
}

export default UserProfile
