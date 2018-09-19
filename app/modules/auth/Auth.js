import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';

import * as c from "../../config/constants";

import * as firebase from 'firebase';
import { Constants, Google } from 'expo';

import styles from "./styles"

import { Analytics, ScreenHit } from 'expo-analytics';


import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';



export default class Auth extends React.Component {

  constructor(props) {
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }

  componentDidMount() {
    const analytics = new Analytics('UA-126042363-1');
    analytics.hit(new ScreenHit('Auth2'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));
  }

  signUpUser = (email, password) => {
    firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(error => {
      console.log('errr')
        switch(error.code) {

            case 'auth/email-already-in-use':
                // do something
               break;
           // handle other codes ...
       }
    });
  }

  loginUser = (email, password) => {
    firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => {
      this.signUpUser(email, password)
      console.log('errr')
        switch(error.code) {

            case 'auth/email-already-in-use':
                // do something
               break;
           // handle other codes ...
       }
    });


  }

  async loginWithFacebook() {

    //ENTER YOUR APP ID
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(c.FACEBOOK_APP_ID, { permissions: ['public_profile'] })

    if (type == 'success') {

      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error)

      })
    }
  }

  async loginWithGoogle() {

    //ENTER YOUR APP ID
    const result = await Expo.Google.logInAsync({
      androidStandaloneAppClientId: c.androidStandaloneAppClientId,
      iosStandaloneAppClientId: c.iosStandaloneAppClientId,
      androidClientId: c.androidClientId,
      iosClientId: c.iosClientId,
      scopes: ['profile', 'email']
    });
    console.log(result.type)
    if (result.type == 'success') {
      console.log(result.accessToken);

      const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken,result.accessToken)

      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error)

      })
    }
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({ email })}
            />

          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({ password })}
            />
          </Item>

          <Button style={{ marginTop: 10,backgroundColor: '#4267b2', borderRadius: 30, marginLeft:15, marginRight:15 }}
            full
            rounded
            primary
            onPress={() => this.loginWithFacebook()}
          >
            <Text style={{ color: 'white' }}>Sign in with Facebook</Text>
          </Button>

          <Button style={{ marginTop: 10,backgroundColor: '#4285F4', borderRadius: 30, marginLeft:15, marginRight:15 }}
            full
            rounded
            primary
            onPress={() => this.loginWithGoogle()}
          >
            <Text style={{ color: 'white' }}> Sign in with Google</Text>
          </Button>

          <View style={{marginTop: 10, height:1, backgroundColor:'#CACACA', marginLeft:15, marginRight:15 }}>
          </View>

          <Button style={{ marginTop: 10,backgroundColor: 'red', borderRadius: 30, marginLeft:15, marginRight:15 }}
            full
            rounded
            onPress={() => this.loginUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: 'white' }}> Login</Text>
          </Button>



        </Form>
      </Container>
    );
  }
}
