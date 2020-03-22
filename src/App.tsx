import React from "react";
import { View, Text, TouchableOpacity, Platform, Button } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider, inject, observer } from "mobx-react";
import store from "./stores/store";


// Look at public/index.html!


const MyButton = (props: { label: string }) => (
  <View>
    <Text>{props.label}</Text>
  </View>
)

type Props = {
  store?: any;
  navigation: any;
}

@inject("store")
@observer
class HomeScreen extends React.Component<Props> {
	
	state = {
		counter: 0
	}
	
  render() {
	  
    const { counter } = this.state;
    const { store : { property, setProperty}, navigation  } = this.props;
	  
    return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#44bb44"
          }}
        >
          <View>
            
            <Text >Hello World</Text>

            <TouchableOpacity testID="button" onPress={() => { this.setState({ counter: counter + 1 }) }}>
              <MyButton label="Press me!"/>
            </TouchableOpacity>
        
            <Text testID="counter">Counter { counter }</Text>
            <Text>{ property }</Text>

            <TouchableOpacity onPress={() => { setProperty("UPDATED MOBX PROP") }}>
              <MyButton label="CHANGE MOBX PROP 1!"/>
            </TouchableOpacity>
            <Button
              title="Go to Details"
              onPress={() => navigation.navigate('Details')}
            />
          </View>
        </View>
    );
  }
}

function DetailsScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

const App = () => (

  <Provider store={store}>
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
)

export default App;

