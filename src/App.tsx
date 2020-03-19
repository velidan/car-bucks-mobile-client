import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";

// Look at public/index.html!


const MyButton = (props: { label: string }) => (
  <View>
    <Text>{props.label}</Text>
  </View>
)

class App extends React.Component {
	
	state = {
		counter: 0
	}
	
  render() {
	  
    const { counter } = this.state;
	  
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
        </View>
      </View>
    );
  }
}

export default App;

