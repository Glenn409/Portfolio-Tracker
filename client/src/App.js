import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import SignUpPage from "./components/SignUp/"
import Dashboard from "./components/Dashboard"


function App() {
  return (
    <Router>
      <div>
        <h1>Portfolio Tracker</h1>
        <Route exact path="/" component={SignUpPage} />
        <Route exact path='/dashboard' component={Dashboard} />
      </div>
    </Router>
  );
}

export default App;
