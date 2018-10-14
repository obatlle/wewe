import React from 'react';
import { StyleSheet, Text, View , Dimensions,ListView, Image} from 'react-native';

import styles from "./styles";

import { Analytics, ScreenHit, Event } from 'expo-analytics';


import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions';

import * as firebase from 'firebase';

var {height, width} = Dimensions.get('window');

const ListItem = require('./ListItem');
const Tabbar = require('../Tabbar/tabbar');


class HistoricalList extends React.Component {


  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          code: child.val().code,
          image_url: child.val().image_url,
          product_brand: child.val().product_brand,
          product_name: child.val().product_name,
          score: child.val().score,
          score_color: child.val().score_color,
          created_at: child.val().created_at,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);

    const analytics = new Analytics('UA-126042363-1');
    analytics.hit(new ScreenHit('HistoricalList'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));
  }

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = firebase.database().ref('Scanned/'+this.props.userUID+'/').orderByChild("created_at");
  }

  _renderItem(item) {
    const onPress = () => {
      let item_firebase_url=''+this.itemsRef.child(item.code)
      let code=item_firebase_url.split('/')[5]
      console.log(code)

      const { getProductInfo } = this.props;
      const { navigate } = this.props.navigation;

      axios.get('https://world.openfoodfacts.org/api/v0/product/'+code+'.json')
      .then(response => {[this.props.getProductInfo(response),navigate('ProductDetail')]});
    };

    return (
      <ListItem item={item} onPress={onPress}/>
    );
  }



  render() {

    const { goBack } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={{fontFamily:'RobotoBold', fontWeight:'400', fontSize:20, color:'#9E9E9E', marginTop:30, textAlign:'center'}}>Historical list</Text>
        <View style={styles.cardContianer}>
          <View>
            <Image style={styles.backgroundCardImage} source={require('../../assets/images/background2.png')}/>
          </View>
        </View>
        <View  style={styles.productInfoContainer}>
          <View style={{height:10}}>
          </View>
          <View style={{width:width*0.95, flex:1, alignSelf:'center'}}>
            <ListView dataSource={this.state.dataSource}
              renderRow={this._renderItem.bind(this)}
              />
          </View>
        </View>
        <View style={{position:'absolute', bottom:0}} >
          <Tabbar navigation={this.props.navigation}>
          </Tabbar>
        </View>
      </View>

    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators (ActionCreators, dispatch);
}

function mapStateToProps (state) {
  return {
    userUID: state.getUserUID,
    productInfo: state.getProductInfo,
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (HistoricalList);
