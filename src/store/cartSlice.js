import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalAmount: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { id, name, price, emoji } = action.payload
            const existingItem = state.items.find(item => item.id === id)

            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({ id, name, price, emoji, quantity: 1 })
            }

            // Recalculate total
            state.totalAmount = state.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            )
        },

        removeItem: (state, action) => {
            const id = action.payload
            const existingItem = state.items.find(item => item.id === id)

            if (existingItem) {
                if (existingItem.quantity === 1) {
                    state.items = state.items.filter(item => item.id !== id)
                } else {
                    existingItem.quantity -= 1
                }
            }

            // Recalculate total
            state.totalAmount = state.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            )
        },

        clearCart: (state) => {
            state.items = []
            state.totalAmount = 0
        },
    },
})

// Export actions
export const { addItem, removeItem, clearCart } = cartSlice.actions

// Base selectors
const selectCartState = (state) => state.cart
const selectTotalAmount = (state) => state.cart.totalAmount

// Memoized selector for tax calculation (10% tax)
// This only recalculates when totalAmount changes
export const selectCartTax = createSelector(
    [selectTotalAmount],
    (totalAmount) => {
        console.log('🧮 Calculating tax... (this should only run when totalAmount changes)')
        return totalAmount * 0.1
    }
)

// Memoized selector for total with tax
export const selectTotalWithTax = createSelector(
    [selectTotalAmount, selectCartTax],
    (totalAmount, tax) => totalAmount + tax
)

// Export reducer
export default cartSlice.reducer
