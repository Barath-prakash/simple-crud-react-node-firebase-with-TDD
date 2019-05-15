import React from 'react';
import {  BrowserRouter as Router, Route } from 'react-router-dom';
import Header from 'components/common/Header';
import EmloyeePageRoute from 'components/pages/employees/Loadable';

const App = ({ location }) => (
  <div>
    <Router>
      <Header/><br/>
      <Route location={location} exact path="/" component={EmloyeePageRoute} />
    </Router>
  </div>
)

export default App;
