# Lab 5: React Advanced — Lab Report

## Overview

This report briefly explains the implementation process of 3 parts from the Lab 5 React Advanced practical exercises.

---

## Part 1: Complex State Management

### Exercise 1.1: The Fetch Machine (useReducer)

**Implementation:**
- Created `UserProfile.jsx` component using `useReducer` hook instead of multiple `useState` hooks
- Defined a **Finite State Machine** pattern with states: `idle`, `loading`, `resolved`, `rejected`
- Implemented reducer with action types: `FETCH_INIT`, `FETCH_SUCCESS`, `FETCH_FAILURE`, `RESET`

**Key Feature - Invalid Transition Prevention:**
```javascript
case 'FETCH_SUCCESS':
  // Can only succeed if currently loading
  if (state.status === 'loading') {
    return { status: 'resolved', data: action.payload, error: null }
  }
  console.warn('Invalid transition: Cannot resolve unless loading')
  return state
```

This prevents "impossible states" like having both loading and error be true simultaneously.

### Exercise 1.2: The Global Store (Redux Toolkit)

**Implementation:**
- Set up Redux store using `configureStore` in `store/store.js`
- Created `cartSlice.js` using `createSlice` with:
  - **State**: `{ items: [], totalAmount: 0 }`
  - **Reducers**: `addItem`, `removeItem`, `clearCart`
- Used `createSelector` for memoized tax calculation (10%):

```javascript
export const selectCartTax = createSelector(
  [selectTotalAmount],
  (totalAmount) => {
    console.log('Calculating tax...')  // Only runs when totalAmount changes
    return totalAmount * 0.1
  }
)
```

---

## Part 2: Performance Engineering

### Exercise 2.1 & 2.2: useMemo, React.memo, useCallback

**Implementation in `Dashboard.jsx`:**

1. **useMemo** - Caches sorted items array:
```javascript
const sortedItems = useMemo(() => {
  return [...items].sort((a, b) => 
    sortOrder === 'asc' ? a.value - b.value : b.value - a.value
  )
}, [items, sortOrder])  // Only recalculates when these change
```

2. **React.memo** - Wraps `ListItem.jsx`:
```javascript
const ListItem = memo(function ListItem({ item, onDelete }) {
  // Only re-renders when item or onDelete props change
})
```

3. **useCallback** - Stabilizes function reference:
```javascript
const handleDelete = useCallback((id) => {
  setItems(prev => prev.filter(item => item.id !== id))
}, [])  // Stable reference prevents child re-renders
```

### Exercise 2.3: Route-Based Code Splitting

**Implementation in `App.jsx`:**
```javascript
import { Suspense, lazy } from 'react'

const AdminPanel = lazy(() => import('./components/Part2/AdminPanel'))

// In routes:
<Route path="/admin" element={
  <Suspense fallback={<LoadingSpinner />}>
    <AdminPanel />
  </Suspense>
} />
```

This reduces initial bundle size by loading AdminPanel only when the route is accessed.

---

## Part 3: Advanced Design Patterns

### Exercise 3.1: Compound Tabs Component

**Implementation in `Tabs.jsx`:**

1. Created `TabsContext` using `createContext`
2. Built parent `Tabs` component holding `activeTabIndex` state
3. Built child components accessing context: `Tabs.List`, `Tabs.Tab`, `Tabs.Panel`

```javascript
const TabsContext = createContext(null)

function Tabs({ children, defaultIndex = 0 }) {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex)
  return (
    <TabsContext.Provider value={{ activeTabIndex, setActiveTabIndex }}>
      {children}
    </TabsContext.Provider>
  )
}

Tabs.List = TabsList
Tabs.Tab = Tab
Tabs.Panel = TabPanel
```

**Usage allows flexible markup:**
```jsx
<Tabs defaultIndex={0}>
  <Tabs.List>
    <Tabs.Tab index={0}>React</Tabs.Tab>
    <Tabs.Tab index={1}>Redux</Tabs.Tab>
  </Tabs.List>
  <div className="divider"></div>  {/* Custom markup */}
  <Tabs.Panel index={0}>React content...</Tabs.Panel>
  <Tabs.Panel index={1}>Redux content...</Tabs.Panel>
</Tabs>
```

### Exercise 3.2: Portal Modal

**Implementation in `Modal.jsx`:**
```javascript
import { createPortal } from 'react-dom'

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null
  
  const modalContent = (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Modal content */}
      </div>
    </div>
  )
  
  // Render outside parent DOM hierarchy
  return createPortal(modalContent, document.getElementById('modal-root'))
}
```

**Event Bubbling Verification:**
- Added `onClick` listener to parent div in `ModalDemo.jsx`
- Clicking button inside Portal still triggers parent's handler
- This demonstrates React's synthetic event bubbling works across portal boundaries


