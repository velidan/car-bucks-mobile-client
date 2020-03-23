import React from "react";
import {
  Router as BrowserRouter,
  Switch,
  Route
} from "react-router";
// import createBrowserHistory from 'history/createBrowserHistory';
// import { Provider } from 'mobx-react';
// import { RouterStore, syncHistoryWithStore } from 'react-router';


import HomeScreen from "./Home";
import DetailsScreen from "./Details";

const Router = ({ history }: any) => (
  <BrowserRouter history={history}>
    <Switch>
      <Route exact path="/">
        <HomeScreen />
      </Route>
      <Route path="/details">
        <DetailsScreen />
      </Route>

    </Switch>
  </BrowserRouter>
)

export default Router;