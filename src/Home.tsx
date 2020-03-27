import React from "react";
import { View, Text, TouchableOpacity, Button, Linking } from "react-native";

import {  inject, observer } from "mobx-react";
import withNavigation from "./withNavigation";

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
  navigation?: any;
}

@inject("store")
@observer
class HomeScreen extends React.Component<Props> {
	
	state = {
		counter: 0
	}
	
  render() {
    console.log("props Home =>>> ", this.props);
	  
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

            <Link href="https://github.com/facebook/create-react-app">
              Create React App
            </Link>

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

export default withNavigation(HomeScreen);