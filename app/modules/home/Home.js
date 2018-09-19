import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from 'native-base';

import * as firebase from 'firebase';

import styles from "./styles";

import { Analytics, PageHit, Event } from 'expo-analytics';



export default class Home extends React.Component {

  componentDidMount(){
    const analytics = new Analytics('UA-126042363-1');
    analytics.event(new Event('Screen', 'Home'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));
  }


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
        <Text style={styles.textField}>Open up App.js to start working on your app!</Text>
        <Button style={{ marginTop: 10 }}
          full
          rounded
          success
          onPress={() => this.logout()}
        >
          <Text style={[styles.textField,{color:'white'}]}>Logout</Text>
        </Button>
      </View>
    );
  }
}
