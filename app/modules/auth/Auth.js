import React from 'react';
import { StyleSheet, Text, View, Alert, Image,Dimensions } from 'react-native';

import * as c from "../../config/constants";

import * as firebase from 'firebase';
import { Constants, Google } from 'expo';

import styles from "./styles"

import { Analytics, ScreenHit, Event } from 'expo-analytics';


import { Container, Form, Input, Item, Button, Label } from 'native-base';

import Swiper from 'react-native-swiper';

var {height, width} = Dimensions.get('window');


export default class Auth extends React.Component {

  constructor(props) {
    super(props)

    this.state = ({
      email: '',
      password: '',
      showEmailForm:false
    })
  }

  componentDidMount() {
    const analytics = new Analytics('UA-126042363-1');
    analytics.hit(new ScreenHit('Auth'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));
  }

  signUpUser = (email, password) => {
    //Tracking event: signup
    const analytics = new Analytics('UA-126042363-1');
    analytics.event(new Event('signup', 'email','auth'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));

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

    //Tracking event: login
    const analytics = new Analytics('UA-126042363-1');
    analytics.event(new Event('login', 'email','auth'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));

    firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => {
      this.signUpUser(email, password)
      console.log('Error login, will try to signup')
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
      //Tracking event: login
      const analytics = new Analytics('UA-126042363-1');
      analytics.event(new Event('login', 'facebook','auth'))
        .then(() => console.log("success"))
        .catch(e => console.log(e.message));

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
      //Tracking event: login
      const analytics = new Analytics('UA-126042363-1');
      analytics.event(new Event('login', 'google','auth'))
        .then(() => console.log("success"))
        .catch(e => console.log(e.message));

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
      <View>
        <Image style={{width:width, height:height+5}} source={require('../../assets/images/backgroundLogin.png')}/>
        <View style={styles.container}>
          <View>
            {!this.state.showEmailForm? (
              <View style={{marginTop:30}}>
                <View style={{height:400, width:width, alignSelf:'center'}}>
                  <Swiper style={styles.wrapper} showsButtons={false} autoplay={true}>
                    <View style={styles.slide1}>
                      <Image style={{width:250, height:250}} source={require('../../assets/images/tutorialSlide1.png')}/>
                      <View style={{width:300}}>
                        <Text style={styles.text}>Scan barcode products</Text>
                      </View>
                    </View>
                    <View style={styles.slide2}>
                      <Image style={{width:250, height:250}} source={require('../../assets/images/tutorialSlide1.png')}/>
                      <View style={{width:300}}>
                        <Text style={styles.text}>Know what you eat</Text>
                      </View>
                    </View>
                    <View style={styles.slide3}>
                      <Image style={{width:250, height:250}} source={require('../../assets/images/tutorialSlide1.png')}/>
                      <View style={{width:300}}>
                        <Text style={styles.text}>Find healthier alternatives</Text>
                      </View>
                    </View>
                  </Swiper>
                </View>
                <View style={{height:20, width:200, alignSelf:'center'}}>
                </View>
              </View>
            ):(
              <View>
              </View>
            )}
            <Button style={{ marginTop: 10,backgroundColor: '#4267b2', borderRadius: 30, marginLeft:15, marginRight:15 }}
              full
              rounded
              primary
              onPress={() => this.loginWithFacebook()}
            >
              <Text style={{ color: 'white' , fontSize:16 }}>Sign in with Facebook</Text>
            </Button>

            <Button style={{ marginTop: 10,backgroundColor: '#4285F4', borderRadius: 30, marginLeft:15, marginRight:15 }}
              full
              rounded
              primary
              onPress={() => this.loginWithGoogle()}
            >
              <Text style={{ color: 'white', fontSize:16  }}> Sign in with Google</Text>
            </Button>


            <Text style={{ color: 'white', marginTop: 15, textAlign:'center', fontSize:16 }}>or signin using an
              <Text> </Text>
              <Text style={{color:'white', fontWeight:'bold',textDecorationLine: 'underline'}} onPress={() => this.setState({ showEmailForm:!this.state.showEmailForm })}>email</Text>
            </Text>

            {this.state.showEmailForm? (
              <View style={{marginTop:20}}>
                <View style={{backgroundColor:'white', borderRadius:15, overflow:'hidden', padding:18}}>
                  <Item floatingLabel>
                    <Label style={{}}>Email</Label>
                    <Input
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={(email) => this.setState({ email })}
                    />
                  </Item>
                  <Item floatingLabel >
                    <Label style={{}}>Password</Label>
                    <Input
                      secureTextEntry={true}
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={(password) => this.setState({ password })}
                    />
                  </Item>
                </View>

                <Button style={{ marginTop: 10,backgroundColor: 'red', borderRadius: 30, marginLeft:15, marginRight:15 }}
                  full
                  rounded
                  primary
                  onPress={() => this.loginUser(this.state.email, this.state.password)}
                >
                  <Text style={{ color: 'white' }}> Sign in with an email</Text>
                </Button>
              </View>
            ):(
              <View></View>
            )}
          </View>
        </View>
      </View>
    );
  }
}
