import React from 'react'
import { createPortal } from 'react-dom'

// Modal component using React Portals
// Renders outside the parent DOM hierarchy to avoid CSS clipping issues
function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null

    // Get the portal target element
    const modalRoot = document.getElementById('modal-root')

    // The modal content that will be portaled
    const modalContent = (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <div className="modal-header">
                    <h3 className="modal-title">{title}</h3>
                    <button className="modal-close" onClick={onClose}>
                        ✕
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    )

    // Use createPortal to render the modal in #modal-root
    // This escapes the parent's CSS stacking context
    return createPortal(modalContent, modalRoot)
}

export default Modal
