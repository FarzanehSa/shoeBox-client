import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

if (process.env.REACT_APP_API_BASE_URL) {
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

console.log(REACT_APP_API_BASE_URL);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);



