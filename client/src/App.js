import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import SignUpPage from "./components/SignUp/"
import Dashboard from "./components/Dashboard"
import './app.css'

function App() {
  return (
    <Router>
      <div className='container'>
        <Route exact path="/" component={SignUpPage} />
        <Route path='/dashboard' component={Dashboard}>
        </Route>
      </div>
    </Router>
  );
}

export default App;
