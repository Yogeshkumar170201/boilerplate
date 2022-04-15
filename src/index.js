import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MoralisProvider } from "react-moralis";

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <MoralisProvider appId={process.env.REACT_APP_APP_ID} serverUrl={process.env.REACT_APP_SERVER_URL}>
    <App />
  </MoralisProvider>
);