import React from 'react';
import { StyleSheet, Text, View , Alert, Dimensions} from 'react-native';

import styles from "./styles";

import { Analytics, ScreenHit, Event } from 'expo-analytics';


var {height, width} = Dimensions.get('window');


export default class ProductDetail extends React.Component {

  componentDidMount(){
    const analytics = new Analytics('UA-126042363-1');
    analytics.hit(new ScreenHit('ProductDetail'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));

  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Product detail</Text>
      </View>
    );
  }
}
