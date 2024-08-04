import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import OwnerDashboard from './pages/OwnerDashboard';
import SystemDashboard from './pages/SystemDashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/owner-dashboard" component={OwnerDashboard} />
        <Route path="/system-dashboard" component={SystemDashboard} />
        <Route path="/" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
