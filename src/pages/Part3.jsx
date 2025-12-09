import React from 'react'
import TabsDemo from '../components/Part3/TabsDemo'
import ModalDemo from '../components/Part3/ModalDemo'

function Part3() {
    return (
        <div>
            <header className="page-header">
                <h1 className="page-title">Part 3: Advanced Design Patterns</h1>
                <p className="page-subtitle">Compound Components & React Portals</p>
            </header>

            <div className="flex flex-col gap-3">
                <TabsDemo />
                <ModalDemo />
            </div>
        </div>
    )
}

export default Part3
