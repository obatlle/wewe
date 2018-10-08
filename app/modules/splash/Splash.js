import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import * as c from "../../config/constants";

import * as firebase from 'firebase';

import styles from "./styles";

import { Analytics, ScreenHit, Event } from 'expo-analytics';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions';

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



class Splash extends React.Component {

  constructor(props) {
    super(props)

    this.state = ({
      email: '',
      password: '',
      isLoggedIn:false
    })
  }

  componentDidMount() {
    const { getUserUID } = this.props;

    const analytics = new Analytics('UA-126042363-1');
    analytics.hit(new ScreenHit('Splash'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));

    firebase.auth().onAuthStateChanged((user) => {
      const { navigate } = this.props.navigation;
      if (user != null) {
        console.log(user.uid)
        this.props.getUserUID(user.uid)
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



function mapDispatchToProps (dispatch) {
  return bindActionCreators (ActionCreators, dispatch);
}

function mapStateToProps (state) {
  return {
        userUID: state.getUserUID,
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (Splash);
