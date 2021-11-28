import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as nearAPI from 'near-api-js';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import getConfig from './config';

// Initializing Contract
async function initContract() {
  //get network config values from config.js
  const nearConfig = getConfig(process.env.NODE_ENV || 'testnet');

  // create keyStore
  const { keyStores } = nearAPI;
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();

  // Initialize connection to near/testnet
  const near = await nearAPI.connect({ keyStore, ...nearConfig });

  // Initialize wallet connection
  const walletConnection = new nearAPI.WalletConnection(near);

  // Load in user's account data
  let currentUser;
  if (walletConnection.getAccountId()) {
    currentUser = {
      // Get accountId as a string
      accountId: walletConnection.getAccountId(),
      // get user token balance
      balance: (await walletConnection.account().state()).amount,
    };
  }

  // Initializing contract APIs by contract name and configuration
  const contract = await new nearAPI.Contract(
    walletConnection.account(),
    nearConfig.contractName,
    {
      viewMethods: ['get_book', 'get_books'],
      changeMethods: ['add_book', 'update_book', 'delete_book'],
      sender: walletConnection.getAccountId,
    }
  );

  return { contract, currentUser, nearConfig, walletConnection };
}

window.nearInitPromise = initContract().then(
  ({ contract, currentUser, nearConfig, walletConnection }) => {
    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <Router>
            <App
              contract={contract}
              currentUser={currentUser}
              nearConfig={nearConfig}
              wallet={walletConnection}
            />
          </Router>
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
