import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

/* if (process.env.REACT_APP_API_BASE_URL) {
    setUrl("https://shoe-box-api.herokuapp.com");
  } else {
    setUrl(`http://localhost:${process.env.REACT_APP_SERVER_PORT || 8100}`);
  }

// -----

useEffect(() => {
    if (matchDashboard) {
      setTitle("Shoe Box Dashboard");
    } else {
      setTitle("Shoe Box");
    }
  },[matchDashboard]);


  const [url, setUrl] = useState("https://shoe-box-api.herokuapp.com");
  const [title, setTitle] = useState("Shoe Box");
  console.log('⭐️ v.02'); */