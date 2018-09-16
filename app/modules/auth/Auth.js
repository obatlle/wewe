import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';

import * as c from "../../config/constants";

import * as firebase from 'firebase';
import { Constants, Google } from 'expo';

import styles from "./styles"


import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

export default class Auth extends React.Component {

  constructor(props) {
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }

  componentDidMount() {


  }

  signUpUser = (email, password) => {

    try {

      if (this.state.password.length < 6) {
        alert("Please enter atleast 6 characters")
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password)
    }
    catch (error) {
      console.log(error.toString())
    }
  }

  loginUser = (email, password) => {

    try {

      firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        console.log(user)

      })
    }
    catch (error) {
      console.log(error.toString())
    }
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

          <Button style={{ marginTop: 10, backgroundColor: 'red' }}
            full
            rounded
            onPress={() => this.loginUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: 'white' }}> Login</Text>
          </Button>

          <Button style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => this.signUpUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: 'white' }}> Sign Up</Text>
          </Button>

          <Button style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => this.loginWithFacebook()}
          >
            <Text style={{ color: 'white' }}> Login With Facebook</Text>
          </Button>

          <Button style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => this.loginWithGoogle()}
          >
            <Text style={{ color: 'white' }}> Login With Google</Text>
          </Button>



        </Form>
      </Container>
    );
  }
}
