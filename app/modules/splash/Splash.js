import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import * as c from "../../config/constants";

import * as firebase from 'firebase';

import styles from "./styles"

// Initialize Firebase
const firebaseConfig = {
    apiKey: c.FIREBASE_API_KEY,
    authDomain: c.FIREBASE_AUTH_DOMAIN,
    databaseURL: c.FIREBASE_DATABASE_URL,
    projectId: c.FIREBASE_PROJECT_ID,
    storageBucket: c.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: c.FIREBASE_MESSAGING_SENDER_ID
};


firebase.initializeApp(firebaseConfig);

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'



export default class Splash extends React.Component {

  constructor(props) {
    super(props)

    this.state = ({
      email: '',
      password: '',
      isLoggedIn:false
    })
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      const { navigate } = this.props.navigation;
      if (user != null) {
        console.log(user)
        this.setState({isLoggedIn:true});
        navigate('Home')
      } else {
        navigate('Auth')
      }
    })
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
      <Image
        style={styles.stretch}
        source={require('../../../assets/splash.png')}
      />
      </Container>
    );
  }
}
