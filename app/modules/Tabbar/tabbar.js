import React, {Component} from 'react';
import { StyleSheet, Dimensions} from 'react-native';
import { Image,TouchableOpacity} from 'react-native';
import ReactNative from 'react-native';
import styles from "./styles";

import { MaterialCommunityIcons } from '@expo/vector-icons';

const { View, TouchableHighlight, Text } = ReactNative;

var {height, width} = Dimensions.get('window');

class Tabbar extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{width:  width, height:45, backgroundColor:'white'}}>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={{height:45,width:width/4}} onPress={() => navigate('Home')}>
            <View style={{flex:1, alignItems:'center'}}>
              <MaterialCommunityIcons style={{alignSelf:'center', marginTop:10}} name="home" size={25} color="#9E9E9E" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{height:45,width:width/4}} onPress={() => navigate('Scan')}>
            <View style={{flex:1, alignItems:'center'}}>
              <MaterialCommunityIcons style={{alignSelf:'center', marginTop:10}} name="barcode-scan" size={25} color="#9E9E9E" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{height:45,width:width/4}} onPress={() => navigate('HistoricalList')}>
            <View style={{flex:1, alignItems:'center'}}>
              <MaterialCommunityIcons style={{alignSelf:'center', marginTop:10}} name="bookmark-outline" size={25} color="#9E9E9E" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{height:45,width:width/4}} onPress={() => navigate('Home')}>
            <View style={{flex:1, alignItems:'center'}}>
              <MaterialCommunityIcons style={{alignSelf:'center', marginTop:10}} name="account" size={25} color="#9E9E9E" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

module.exports = Tabbar;
