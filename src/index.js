import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';
import reportWebVitals from './reportWebVitals';
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense('ORg4AjUWIQA/Gnt2VFhiQlJPcUBKQmFJfFBmRGJTfVp6dlJWESFaRnZdQV1lSXZSd0dmWHxceXVR');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <ContextProvider>
      <React.StrictMode>
          <App />
      </React.StrictMode>
  </ContextProvider>
  
);

reportWebVitals();
