import React from 'react'

// This is a "heavy" component that simulates loading charting libraries
// It's lazy-loaded via React.lazy() in App.jsx to reduce initial bundle size
function AdminPanel() {
    // Simulate heavy computation on mount
    console.log('📊 AdminPanel loaded! (This was lazy-loaded)')

    return (
        <div>
            <header className="page-header">
                <h1 className="page-title">Admin Panel</h1>
                <p className="page-subtitle">
                    This component was lazy-loaded using React.lazy + Suspense
                </p>
            </header>

            <div className="admin-panel">
                <div className="card mb-2" style={{ background: 'rgba(34, 197, 94, 0.1)', borderColor: 'var(--success)' }}>
                    <h4 style={{ color: 'var(--success)' }}>✅ Successfully Lazy Loaded!</h4>
                    <p className="text-muted">
                        This AdminPanel component was not included in the initial JavaScript bundle.
                        It was loaded on-demand when you navigated to this route, reducing initial load time.
                    </p>
                </div>

                {/* Mock Stats */}
                <h4 className="mb-1">Dashboard Statistics</h4>
                <div className="admin-stats">
                    <div className="stat-card">
                        <div className="stat-value">1,234</div>
                        <div className="stat-label">Total Users</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">567</div>
                        <div className="stat-label">Active Today</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">$89.2K</div>
                        <div className="stat-label">Revenue</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">98.5%</div>
                        <div className="stat-label">Uptime</div>
                    </div>
                </div>

                {/* Mock Chart */}
                <h4 className="mb-1">Analytics Chart</h4>
                <div className="chart-placeholder">
                    <p style={{ fontSize: '3rem' }}>📈</p>
                    <p>Chart Component Placeholder</p>
                    <p className="text-sm text-muted">
                        In a real app, this would load heavy charting libraries (Chart.js, D3, etc.)
                        which would significantly increase the initial bundle size if not lazy-loaded.
                    </p>
                </div>

                {/* Code Splitting Info */}
                <div className="event-log mt-2">
                    <h4>📦 Code Splitting Benefits:</h4>
                    <p className="text-sm">• Reduced initial bundle size (faster first load)</p>
                    <p className="text-sm">• Components loaded only when needed</p>
                    <p className="text-sm">• Better user experience for rarely-used features</p>
                    <p className="text-sm mt-1">
                        <strong>Implementation:</strong> React.lazy(() =&gt; import('./AdminPanel')) + Suspense
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel
