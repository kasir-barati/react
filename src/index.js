import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './containers/App/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
/**
 * Strict mode can’t automatically detect side effects for you, but it can help you spot them by making them a little more deterministic. This is done by intentionally double-invoking these functions:
 * - Class component: constructor, render, shouldComponentUpdate, getDerivedStateFromProps
 * - Function component: its body,
 * - State updater functions (the first argument to setState)
 * - Functions passed to useState, useMemo, or useReducer
 * This only applies to development mode. Lifecycles will not be double-invoked in production mode.
 */
root.render(
    <React.StrictMode>
        <App />,
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
