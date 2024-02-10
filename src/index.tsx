import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@redux/configure-store';

import 'normalize.css';
import './index.scss';
import { App } from './App';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
            {/* <div className=''>hhh</div> */}
        </Provider>
    </React.StrictMode>,
);
