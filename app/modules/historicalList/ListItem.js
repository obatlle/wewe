import React, {Component} from 'react';
import { Image} from 'react-native';
import ReactNative from 'react-native';
import styles from "./styles";

import { MaterialCommunityIcons } from '@expo/vector-icons';

const { View, TouchableHighlight, Text } = ReactNative;


class ListItem extends Component {


  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={{height:100, backgroundColor:'white', flex:1,marginTop:6, borderRadius:10}}>
          <View style={{flexDirection:'row'}}>
            <View style={{alignSelf:'center', marginLeft:5, marginTop:5}}>
              <Image style={{  width:80, height:80, resizeMode:'contain'}}
              source={{uri: this.props.item.image_url}}/>
            </View>
            <View style={{flex:4, flexDirection:'column', marginTop:10, marginLeft:15}}>
              <Text style={{fontFamily:'RobotoBold', fontSize:18}}>{this.props.item.product_name}</Text>
              <Text>{this.props.item.product_brand}</Text>
              <View style={{flexDirection:'row', marginTop:10}}>
                <View style={{height:15, width:15, borderRadius:15, marginTop:1, backgroundColor:this.props.item.score_color}}/>
                <Text style={{marginLeft:5}}>{this.props.item.code}</Text>
              </View>
            </View>
            <View style={{ flex:1, height:100}}>
              <MaterialCommunityIcons style={{marginTop:35,marginLeft:20}} name="chevron-right" size={30} color="#9E9E9E" />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;
