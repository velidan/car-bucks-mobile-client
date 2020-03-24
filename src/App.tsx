import React from 'react';

import { Platform} from 'react-native';

import { Provider } from 'mobx-react';
import store from './stores/store';

import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

const Router  = require('./Router').default;

let history: any;
let rootStore: any = { store };

console.log(process.env.ELECTRON)

if ( Platform.OS === "web" ) {
  // const browserHistory = createBrowserHistory({ basename: "./" });
  const browserHistory = createMemoryHistory();
  const routingStore = new RouterStore();

  rootStore = {
    ...rootStore,
    routingStore
  }

  history = syncHistoryWithStore(browserHistory, routingStore);
}

console.log("rootStore", rootStore)

// import HomeScreen from "./Home";
// import DetailsScreen from "./Details";

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

function App() {
  return (
    <Provider {...rootStore}>
      <Router history={history} />
    </Provider>
  );
}

export default App;

