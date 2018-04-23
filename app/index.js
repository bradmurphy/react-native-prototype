import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Picker,
  AppState,
  Platform
} from "react-native";
import PushNotification from "react-native-push-notification";

import PushController from "./PushController";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.state = {
      seconds: 5
    };
  }

  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if (appState === "background") {
      const { seconds } = this.state;
      let date = new Date(Date.now() + seconds * 1000);
      let message = `${second} second notification.`;

      if (Platform.OS === "ios") {
        date = date.toISOString();
      }

      PushNotification.localNotificationSchedule({ message, date });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Choose your notification time in seconds.
        </Text>
        <Picker
          style={styles.picker}
          selectedValue={this.state.seconds}
          onValueChange={seconds => this.setState({ seconds })}
        >
          <Picker.Item label="5" value={5} />
          <Picker.Item label="10" value={10} />
          <Picker.Item label="15" value={15} />
        </Picker>
        <PushController />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  picker: {
    width: 100
  }
});
