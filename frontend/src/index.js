import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import configStore from './app/store'
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/fonts/JSArirangHON.css";

const {store, persistor} = configStore();
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
  		{/* <BrowserRouter> */}
  		  <App />
 		  {/* </BrowserRouter>, */}
      </PersistGate>
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
