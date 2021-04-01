import React from 'react';
import { Router, Route } from 'react-router-dom';
import * as H from 'history';
import { createGenerateClassName, StylesProvider } from '@material-ui/styles';
import DashBoard from './features/covid/DashBoard/DashBoard';

const defaultHistory = H.createBrowserHistory();

const generateClassName = createGenerateClassName({
  productionPrefix: 'ja',
});

const App: ({ history }: { history?: H.History }) => JSX.Element = ({
  history = defaultHistory,
}) => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <Route exact path="/japan" component={DashBoard} />
      </Router>
    </StylesProvider>
  );
};

export default App;
