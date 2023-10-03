import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import FormInterface from './components/FormInterface.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <div>
    <Router>
      <Route exact path='/' component={App}></Route>
      <Route path='/form-interface' component={FormInterface}></Route>
    </Router>
  </div>
);