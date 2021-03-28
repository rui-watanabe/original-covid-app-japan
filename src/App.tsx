import React from 'react';
import { Router, Route } from 'react-router-dom';
import * as H from 'history';
import DashBoard from './features/covid/DashBoard/DashBoard';

const defaultHistory = H.createBrowserHistory();

const App: ({ history }: { history?: H.History }) => JSX.Element = ({
  history = defaultHistory,
}) => {
  return (
    <Router history={history}>
      <Route exact path="/" component={DashBoard} />
    </Router>
  );
};

export default App;
