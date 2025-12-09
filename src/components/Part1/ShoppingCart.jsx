import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem, clearCart, selectCartTax, selectTotalWithTax } from '../../store/cartSlice'

// Sample products
const products = [
    { id: 1, name: 'Laptop', price: 999.99, emoji: '💻' },
    { id: 2, name: 'Phone', price: 699.99, emoji: '📱' },
    { id: 3, name: 'Headphones', price: 199.99, emoji: '🎧' },
    { id: 4, name: 'Watch', price: 299.99, emoji: '⌚' },
    { id: 5, name: 'Camera', price: 549.99, emoji: '📷' },
    { id: 6, name: 'Tablet', price: 449.99, emoji: '📟' },
]

function ShoppingCart() {
    const dispatch = useDispatch()
    const items = useSelector(state => state.cart.items)
    const totalAmount = useSelector(state => state.cart.totalAmount)

    // Using memoized selectors - tax only recalculates when totalAmount changes
    const tax = useSelector(selectCartTax)
    const totalWithTax = useSelector(selectTotalWithTax)

    const handleAddItem = (product) => {
        dispatch(addItem(product))
    }

    const handleRemoveItem = (id) => {
        dispatch(removeItem(id))
    }

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    return (
        <div className="exercise-card">
            <h3 className="exercise-title">Exercise 1.2: The Global Store (Redux Toolkit)</h3>
            <p className="exercise-description">
                Shopping cart with Redux Toolkit's configureStore and createSlice.
                Uses createSelector for memoized tax calculation (check console).
            </p>

            <div className="cart-container">
                {/* Products Grid */}
                <div>
                    <h4 className="mb-1">Products</h4>
                    <div className="products-grid">
                        {products.map(product => (
                            <div key={product.id} className="product-card">
                                <div className="product-emoji">{product.emoji}</div>
                                <div className="product-name">{product.name}</div>
                                <div className="product-price">${product.price.toFixed(2)}</div>
                                <button
                                    onClick={() => handleAddItem(product)}
                                    className="btn btn-primary btn-sm"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cart Sidebar */}
                <div className="cart-sidebar">
                    <div className="flex justify-between items-center mb-1">
                        <h4>Shopping Cart</h4>
                        {items.length > 0 && (
                            <button
                                onClick={handleClearCart}
                                className="btn btn-danger btn-sm"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {items.length === 0 ? (
                        <p className="text-muted text-center" style={{ padding: '2rem' }}>
                            🛒 Your cart is empty
                        </p>
                    ) : (
                        <>
                            {items.map(item => (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-info">
                                        <span>{item.emoji}</span>
                                        <span>{item.name}</span>
                                        <span className="cart-item-qty">×{item.quantity}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="btn btn-secondary btn-sm"
                                            style={{ padding: '0.25rem 0.5rem' }}
                                        >
                                            −
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="cart-summary">
                                <div className="cart-summary-row">
                                    <span>Subtotal:</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </div>
                                <div className="cart-summary-row">
                                    <span>Tax (10%):</span>
                                    <span className="text-muted">${tax.toFixed(2)}</span>
                                </div>
                                <div className="cart-summary-row cart-total">
                                    <span>Total:</span>
                                    <span>${totalWithTax.toFixed(2)}</span>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Memoization Note */}
                    <div className="event-log mt-2">
                        <p className="text-sm text-muted">
                            💡 Open browser console to see tax calculation logs.
                            The memoized selector only recalculates when totalAmount changes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart
