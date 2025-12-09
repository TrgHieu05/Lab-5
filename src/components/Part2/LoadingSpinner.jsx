import React from 'react'

function LoadingSpinner() {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
            <p>Loading component...</p>
            <p className="text-sm text-muted">
                This spinner appears while the lazy-loaded component is being fetched.
            </p>
        </div>
    )
}

export default LoadingSpinner
