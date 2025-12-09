import React from 'react'
import { NavLink } from 'react-router-dom'
import Dashboard from '../components/Part2/Dashboard'

function Part2() {
    return (
        <div>
            <header className="page-header">
                <h1 className="page-title">Part 2: Performance Engineering</h1>
                <p className="page-subtitle">useMemo, useCallback, React.memo & Code Splitting</p>
            </header>

            <div className="flex flex-col gap-3">
                <Dashboard />

                {/* Code Splitting Demo Info */}
                <div className="exercise-card">
                    <h3 className="exercise-title">Exercise 2.3: Route-Based Code Splitting</h3>
                    <p className="exercise-description">
                        The AdminPanel is lazy-loaded using React.lazy and Suspense.
                        It's only downloaded when you navigate to the Admin route.
                    </p>

                    <div className="flex gap-2 items-center">
                        <NavLink to="/admin" className="btn btn-primary">
                            Go to Admin Panel (Lazy Loaded) →
                        </NavLink>
                        <span className="text-muted text-sm">
                            Watch the network tab - you'll see a new chunk download!
                        </span>
                    </div>

                    <div className="card mt-2">
                        <h4>How it works:</h4>
                        <pre style={{
                            background: 'var(--bg-secondary)',
                            padding: '1rem',
                            borderRadius: '8px',
                            overflow: 'auto',
                            fontSize: '0.9rem'
                        }}>
                            {`// In App.jsx:
const AdminPanel = lazy(() => import('./components/Part2/AdminPanel'))

// In Routes:
<Route 
  path="/admin" 
  element={
    <Suspense fallback={<LoadingSpinner />}>
      <AdminPanel />
    </Suspense>
  } 
/>`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Part2
