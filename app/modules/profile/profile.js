import React from 'react';
import { StyleSheet, Text, View, Dimensions  } from 'react-native';

import { Button } from 'native-base';

import * as firebase from 'firebase';

import styles from "./styles";

import { Analytics, ScreenHit, Event } from 'expo-analytics';


var {height, width} = Dimensions.get('window');

const Tabbar = require('../Tabbar/tabbar');


export default class Profile extends React.Component {

  componentDidMount(){
    const analytics = new Analytics('UA-126042363-1');
    analytics.hit(new ScreenHit('Profile'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));

  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }



  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Button style={{position:'absolute', bottom: 50, width:width*0.5, alignSelf:'center', flexDirection:'row'}}
          full
          rounded
          success
          onPress={() => navigate('Scan')}
        >
          <MaterialCommunityIcons style={{}} name="barcode-scan" size={30} color="white" />
          <Text style={[styles.textField,{color:'white', marginLeft:8}]}>Scan</Text>

        </Button>
        <Tabbar navigation={this.props.navigation}>
        </Tabbar>
      </View>

    );
  }
}
