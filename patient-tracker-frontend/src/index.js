import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import './index.css';
import App from './App';
import { FavoritesContextProvider } from './store/favorites-context';
import { AuthContextProvider } from './store/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>  
    <FavoritesContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </FavoritesContextProvider>
    </AuthContextProvider>
);

