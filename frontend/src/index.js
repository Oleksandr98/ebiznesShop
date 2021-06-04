import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "mobx-react";
import signInFormStore from "./components/auth/SignInFormStore";
import AuthStore from "./components/auth/AuthStore";
import signUpFormStore from "./components/auth/SignUpFormStore";
import ProductStore from "./components/auth/ProductStore";

ReactDOM.render(
    <React.StrictMode>
        <Provider signInFormStore={signInFormStore} signUpFormStore={signUpFormStore} productStore={ProductStore}
                  authStore={AuthStore}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
