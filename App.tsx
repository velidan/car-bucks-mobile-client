import React from 'react';
import { StyleSheet, Image, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';

import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';

import { argonTheme } from './constants';

import Login from "./screens/Login";

function LogoTitle(props) {
  return (
    <Text>Logo title</Text>
    // <Image
    //   style={{ width: 50, height: 50 }}
    //   source={require('@expo/snack-static/react-native-logo.png')}
    // />
  );
}

function HomeScreen({ navigation }) {
  const [count, setCount] = React.useState(0);

  navigation.setOptions({
    headerRight: () => (
      <Button onPress={() => setCount(c => c + 1)} title="Update count" />
    ),
  });

  return <View>
    <Text>Count: {count}</Text>
    
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', {
          itemId: 86,
          otherParam: 'anything you want here',
        })}
      />

      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
      
      <Button
        onPress={() => navigation.navigate('MyModal')}
        title="Open Modal"
      />
      
    </View>;
}

function DetailsScreen({ route, navigation }) {
  /* 2. Get the param */
  const { itemId } = route.params;
  const { otherParam } = route.params;


  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log("focus")
      return () => {
        console.log("unfocus")
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     console.log("screen focused")
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>

      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>

      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details', {
          itemId: Math.floor(Math.random() * 100),
        })}
      />

      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();


function MainStackScreen() {
  return (
    <MainStack.Navigator initialRouteName='Home'>
      <MainStack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ 
            headerTitle: props => <LogoTitle {...props} />,
            // ATTENTION. THis in onPress isn't a HomeScreen. It's just a button
            // To achieve correct this we need to setProps DIRECTLY in the HomeScreen
            // headerRight: () => (
            //   <Button
            //     onPress={() => alert('This is a button!')}
            //     title="Info"
            //     color="#fff"
            //   />
            //   )
          
          }}
          // options={{
          //   title: 'My home',
          //   headerStyle: {
          //     backgroundColor: '#f4511e',
          //   },
          //   headerTintColor: '#fff',
          //   headerTitleStyle: {
          //     fontWeight: 'bold',
          //   },
          // }}
        />
        <MainStack.Screen name="Details" component={DetailsScreen} initialParams={{ itemId: 42 }} />
        <MainStack.Screen name="Login" component={Login} />
    </MainStack.Navigator>
  );
}

function RootStackScreen() {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="MyModal" component={ModalScreen} />
    </RootStack.Navigator>
  );
}


export default function App() {
  return (
    <GalioProvider theme={argonTheme}>
        <NavigationContainer>
          <RootStack.Navigator mode="modal" headerMode="none">
            <RootStack.Screen name="Main" component={MainStackScreen} />
            <RootStack.Screen name="MyModal" component={ModalScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
    </GalioProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
