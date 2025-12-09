import React from 'react'
import UserProfile from '../components/Part1/UserProfile'
import ShoppingCart from '../components/Part1/ShoppingCart'

function Part1() {
    return (
        <div>
            <header className="page-header">
                <h1 className="page-title">Part 1: Complex State Management</h1>
                <p className="page-subtitle">useReducer for state machines & Redux Toolkit for global state</p>
            </header>

            <div className="flex flex-col gap-3">
                <UserProfile />
                <ShoppingCart />
            </div>
        </div>
    )
}

export default Part1
