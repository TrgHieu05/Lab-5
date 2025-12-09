import React, { Suspense, lazy } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import LoadingSpinner from './components/Part2/LoadingSpinner'

// Regular imports for Parts 1 and 3
import Part1 from './pages/Part1'
import Part2 from './pages/Part2'
import Part3 from './pages/Part3'

// Lazy load AdminPanel for Exercise 2.3 (Code Splitting)
const AdminPanel = lazy(() => import('./components/Part2/AdminPanel'))

function App() {
    return (
        <div className="app">
            <nav className="navbar">
                <div className="navbar-container">
                    <NavLink to="/" className="navbar-brand">
                        Lab 5: React Advanced
                    </NavLink>
                    <ul className="navbar-links">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                end
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/part1"
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >
                                Part 1: State Management
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/part2"
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >
                                Part 2: Performance
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/part3"
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >
                                Part 3: Design Patterns
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin"
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >
                                Admin (Lazy)
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/part1" element={<Part1 />} />
                    <Route path="/part2" element={<Part2 />} />
                    <Route path="/part3" element={<Part3 />} />
                    <Route
                        path="/admin"
                        element={
                            <Suspense fallback={<LoadingSpinner />}>
                                <AdminPanel />
                            </Suspense>
                        }
                    />
                </Routes>
            </main>
        </div>
    )
}

function Home() {
    return (
        <div>
            <header className="page-header">
                <h1 className="page-title">React Advanced Exercises</h1>
                <p className="page-subtitle">Lab 5 — Complex State, Performance & Design Patterns</p>
            </header>

            <div className="exercise-grid">
                <NavLink to="/part1" className="exercise-card" style={{ textDecoration: 'none' }}>
                    <h2 className="exercise-title">Part 1: Complex State Management</h2>
                    <p className="exercise-description">
                        Learn to use useReducer for deterministic state transitions and Redux Toolkit for global state management.
                    </p>
                    <span className="btn btn-primary">Explore →</span>
                </NavLink>

                <NavLink to="/part2" className="exercise-card" style={{ textDecoration: 'none' }}>
                    <h2 className="exercise-title">Part 2: Performance Engineering</h2>
                    <p className="exercise-description">
                        Optimize React applications using useMemo, useCallback, React.memo, and Code Splitting.
                    </p>
                    <span className="btn btn-primary">Explore →</span>
                </NavLink>

                <NavLink to="/part3" className="exercise-card" style={{ textDecoration: 'none' }}>
                    <h2 className="exercise-title">Part 3: Advanced Design Patterns</h2>
                    <p className="exercise-description">
                        Build reusable component libraries using Compound Components and Portals.
                    </p>
                    <span className="btn btn-primary">Explore →</span>
                </NavLink>
            </div>
        </div>
    )
}

export default App
