import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from 'native-base';

import * as firebase from 'firebase';

export default class Home extends React.Component {

  logout = () => {
    const { navigate } = this.props.navigation;

    try {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        }, function(error) {
          console.log(error)
          // An error happened.
        });
    }
    catch (error) {
      console.log(error.toString())
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button style={{ marginTop: 10 }}
          full
          rounded
          success
          onPress={() => this.logout()}
        >
          <Text style={{ color: 'white' }}>Logout</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
