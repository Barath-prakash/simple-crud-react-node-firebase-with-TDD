import React from 'react';
import {  BrowserRouter as Router, Route } from 'react-router-dom';
import Header from 'components/common/Header';
import EmployeePage from 'components/pages/employees/EmployeePage';

const App = ({ location }) => (
  <div>
    <Router>
      <Header/><br/>
      <Route location={location} exact path="/" component={EmployeePage} />
    </Router>
  </div>
)

export default App;
