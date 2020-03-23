import React from 'react';
import { View, Text, TouchableOpacity, Platform, Linking } from 'react-native';

import { Provider, inject, observer } from 'mobx-react';
import store from './stores/store';

const Router  = require('./Router').default;

// Look at public/index.html!

const Link = ({ href, children }: any) => (
  <Text
    accessibilityRole="link"
    onPress={() => {
      Linking.openURL(href);
    }}
  >
    <Text>{children}</Text>
  </Text>
);

const MyButton = (props: { label: string }) => (
  <View>
    <Text>{props.label}</Text>
  </View>
)

type Props = {
  store?: any;
}

@inject('store')
@observer
class Home extends React.Component<Props> {
	
	state = {
		counter: 0
	}
	
  render() {
	  
    const { counter } = this.state;
    const { property, setProperty } = this.props.store;
	  
    return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#44bb44'
          }}
        >
          <View>
            
            <Text >Hello World</Text>
            <Link href="https://github.com/facebook/create-react-app">
              Create React App
            </Link>
            <Router label="Ass" />

            <TouchableOpacity testID='button' onPress={() => { this.setState({ counter: counter + 1 }) }}>
              <MyButton label='Press me!'/>
            </TouchableOpacity>
        
            <Text testID='counter'>Counter { counter }</Text>
            <Text>{ property }</Text>

            <TouchableOpacity onPress={() => { setProperty('UPDATED MOBX PROP') }}>
              <MyButton label='CHANGE MOBX PROP 1!'/>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

const App = () => (
  <Provider store={store}>
    <Home />
  </Provider>
)

export default App;

