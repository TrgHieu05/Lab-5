import React, { useState } from 'react'
import Modal from './Modal'

function ModalDemo() {
    const [isOpen, setIsOpen] = useState(false)
    const [eventLog, setEventLog] = useState([])

    const addLog = (message) => {
        setEventLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`])
    }

    // This handler is on the parent div (NOT inside the portal)
    // React's synthetic event bubbling will still trigger this
    // even when clicking the button inside the portal!
    const handleParentClick = (e) => {
        // Only log if the target is a button (to avoid logging every click)
        if (e.target.tagName === 'BUTTON') {
            addLog('🎯 Parent onClick triggered (event bubbled from Portal!)')
        }
    }

    return (
        <div className="exercise-card">
            <h3 className="exercise-title">Exercise 3.2: "Trapdoor" Modal (Portals)</h3>
            <p className="exercise-description">
                The modal uses ReactDOM.createPortal to render in #modal-root, escaping
                parent CSS clipping. React synthetic events still bubble through the portal!
            </p>

            {/* Parent div with onClick to demonstrate event bubbling */}
            <div onClick={handleParentClick}>
                {/* Card with overflow:hidden to demonstrate the problem portals solve */}
                <div className="card" style={{
                    overflow: 'hidden',
                    maxHeight: '200px',
                    position: 'relative'
                }}>
                    <h4>Card with overflow: hidden</h4>
                    <p className="text-muted text-sm mb-2">
                        Without portals, modals would be clipped by this container.
                        The modal escapes by rendering in a separate DOM node (#modal-root).
                    </p>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="btn btn-primary"
                    >
                        Open Modal 🚪
                    </button>
                </div>

                {/* Modal - will be portaled outside this div */}
                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Portal Modal"
                >
                    <p className="mb-2">
                        This modal is rendered in <code>#modal-root</code> via createPortal,
                        completely outside the parent component's DOM hierarchy.
                    </p>

                    <h4 className="mb-1">Benefits:</h4>
                    <ul className="text-sm" style={{ marginLeft: '1.5rem' }}>
                        <li>Escapes parent overflow:hidden</li>
                        <li>Avoids z-index stacking issues</li>
                        <li>Proper modal positioning</li>
                    </ul>

                    <div className="mt-2">
                        <h4 className="mb-1">Event Bubbling Test:</h4>
                        <p className="text-sm text-muted mb-1">
                            Click this button - even though the modal is in a different DOM location,
                            React's synthetic events still bubble to the parent component!
                        </p>
                        <button
                            onClick={() => addLog('✅ Modal button clicked')}
                            className="btn btn-secondary"
                        >
                            Click me to test event bubbling
                        </button>
                    </div>
                </Modal>
            </div>

            {/* Event Log */}
            <div className="event-log mt-2">
                <h4>Event Log:</h4>
                {eventLog.length === 0 ? (
                    <p className="text-muted text-sm">Click the button inside the modal to see event bubbling...</p>
                ) : (
                    eventLog.map((log, i) => (
                        <p key={i} className="event-log-entry">{log}</p>
                    ))
                )}
            </div>

            {/* DOM Structure Info */}
            <div className="card mt-2">
                <h4>DOM Structure:</h4>
                <pre style={{
                    background: 'var(--bg-secondary)',
                    padding: '1rem',
                    borderRadius: '8px',
                    overflow: 'auto',
                    fontSize: '0.85rem'
                }}>
                    {`<body>
  <div id="root">
    <!-- Main app tree -->
    <div onClick={handleParentClick}> <!-- Parent listener -->
      <div style="overflow: hidden">
        <!-- Button to open modal -->
      </div>
    </div>
  </div>
  
  <div id="modal-root">
    <!-- Modal rendered here via Portal! -->
    <!-- Events still bubble to parent in React tree -->
  </div>
</body>`}
                </pre>
            </div>
        </div>
    )
}

export default ModalDemo
