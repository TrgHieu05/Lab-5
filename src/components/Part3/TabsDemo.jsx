import React from 'react'
import Tabs from './Tabs'

function TabsDemo() {
    return (
        <div className="exercise-card">
            <h3 className="exercise-title">Exercise 3.1: Compound Tabs Component</h3>
            <p className="exercise-description">
                Compound components share implicit state via Context, providing a flexible API.
                Custom markup can be added between components (like the divider below).
            </p>

            <Tabs defaultIndex={0}>
                <Tabs.List>
                    <Tabs.Tab index={0}>⚛️ React</Tabs.Tab>
                    <Tabs.Tab index={1}>🔄 Redux</Tabs.Tab>
                    <Tabs.Tab index={2}>🚀 Next.js</Tabs.Tab>
                </Tabs.List>

                {/* Custom markup allowed here - demonstrating flexibility */}
                <div style={{
                    height: '3px',
                    background: 'var(--accent-gradient)',
                    opacity: 0.3
                }}></div>

                <Tabs.Panel index={0}>
                    <h4>React</h4>
                    <p>
                        React is a JavaScript library for building user interfaces. It lets you compose
                        complex UIs from small and isolated pieces of code called "components".
                    </p>
                    <ul className="mt-1">
                        <li>Component-based architecture</li>
                        <li>Virtual DOM for efficient updates</li>
                        <li>Declarative programming style</li>
                        <li>Rich ecosystem and community</li>
                    </ul>
                </Tabs.Panel>

                <Tabs.Panel index={1}>
                    <h4>Redux</h4>
                    <p>
                        Redux is a predictable state container for JavaScript apps. It helps you write
                        applications that behave consistently and are easy to test.
                    </p>
                    <ul className="mt-1">
                        <li>Single source of truth (store)</li>
                        <li>State is read-only</li>
                        <li>Changes made with pure reducer functions</li>
                        <li>Redux Toolkit simplifies setup</li>
                    </ul>
                </Tabs.Panel>

                <Tabs.Panel index={2}>
                    <h4>Next.js</h4>
                    <p>
                        Next.js is a React framework for production. It provides hybrid static & server
                        rendering, TypeScript support, smart bundling, route pre-fetching, and more.
                    </p>
                    <ul className="mt-1">
                        <li>Server-side rendering (SSR)</li>
                        <li>Static site generation (SSG)</li>
                        <li>File-based routing</li>
                        <li>API routes built-in</li>
                    </ul>
                </Tabs.Panel>
            </Tabs>

            {/* Code Example */}
            <div className="card mt-2">
                <h4>Component Structure:</h4>
                <pre style={{
                    background: 'var(--bg-secondary)',
                    padding: '1rem',
                    borderRadius: '8px',
                    overflow: 'auto',
                    fontSize: '0.85rem'
                }}>
                    {`<Tabs defaultIndex={0}>
  <Tabs.List>
    <Tabs.Tab index={0}>React</Tabs.Tab>
    <Tabs.Tab index={1}>Redux</Tabs.Tab>
  </Tabs.List>

  <div className="divider"></div> {/* Custom markup */}

  <Tabs.Panel index={0}>React content...</Tabs.Panel>
  <Tabs.Panel index={1}>Redux content...</Tabs.Panel>
</Tabs>`}
                </pre>
            </div>
        </div>
    )
}

export default TabsDemo
