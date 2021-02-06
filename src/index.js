import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth from './components/Auth';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

function Router () {

  return (
    <CookiesProvider>
      <React.StrictMode>
        <BrowserRouter>
          <Route path='/' component={Auth} exact={true}/>
          <Route path='/movies' component={App} exact={true}/>
        </BrowserRouter>
      </React.StrictMode>
    </CookiesProvider>
  )
}

ReactDOM.render(<Router />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
