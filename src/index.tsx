import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { AppState } from './context/AppContext';
import { App } from './App';

import './index.scss';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <AppState>
            <HashRouter>
                <App />
            </HashRouter>
        </AppState>
    </React.StrictMode>
);
