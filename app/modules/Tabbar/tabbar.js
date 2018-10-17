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
    console.log(this.props.navigation.state.routeName)
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{width:  width, height:45, backgroundColor:'white'}}>
        <View style={{height:0.2, width:width, backgroundColor:'#F0F0F0'}}/>
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={{height:45,width:width/4}} onPress={() => navigate('Home')}>
            <View style={{flex:1, alignItems:'center'}}>
              {this.props.navigation.state.routeName=='Home'?(
                <MaterialCommunityIcons style={{alignSelf:'center', marginTop:10}} name="home" size={25} color="#0A1669" />
              ):(
                <MaterialCommunityIcons style={{alignSelf:'center', marginTop:10}} name="home" size={25} color="#9E9E9E" />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{height:45,width:width/4}} onPress={() => navigate('Scan')}>
            <View style={{flex:1, alignItems:'center'}}>
              {this.props.navigation.state.routeName=='Scan'?(
                <MaterialCommunityIcons style={{alignSelf:'center', marginTop:10}} name="barcode-scan" size={25} color="#0A1669" />
              ):(
                <MaterialCommunityIcons style={{alignSelf:'center', marginTop:10}} name="barcode-scan" size={25} color="#9E9E9E" />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{height:45,width:width/4}} onPress={() => navigate('HistoricalList')}>
            <View style={{flex:1, alignItems:'center'}}>
              {this.props.navigation.state.routeName=='HistoricalList'?(
                <MaterialCommunityIcons style={{alignSelf:'center', marginTop:10}} name="bookmark-outline" size={25} color="#0A1669" />
              ):(
                <MaterialCommunityIcons style={{alignSelf:'center', marginTop:10}} name="bookmark-outline" size={25} color="#9E9E9E" />
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{height:45,width:width/4}} onPress={() => navigate('Profile')}>
            <View style={{flex:1, alignItems:'center'}}>
              {this.props.navigation.state.routeName=='Profile'?(
                <MaterialCommunityIcons style={{alignSelf:'center', marginTop:10}} name="account" size={25} color="#0A1669" />
              ):(
                <MaterialCommunityIcons style={{alignSelf:'center', marginTop:10}} name="account" size={25} color="#9E9E9E" />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}



module.exports = Tabbar;
