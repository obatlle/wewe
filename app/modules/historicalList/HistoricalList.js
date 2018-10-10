import React from 'react';
import { StyleSheet, Text, View , Dimensions,ListView} from 'react-native';

import styles from "./styles";

import { Analytics, ScreenHit, Event } from 'expo-analytics';


import { Ionicons } from '@expo/vector-icons';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions';

import * as firebase from 'firebase';

var {height, width} = Dimensions.get('window');

const ListItem = require('./ListItem');


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
    this.itemsRef = firebase.database().ref('Scanned/'+this.props.userUID+'/');
    console.log('YYYYYYYYYY'+this.itemsRef)
  }

  _renderItem(item) {
    const onPress = () => {
      console.log(this.itemsRef.child(item._key))
    };

    return (
      <ListItem item={item} onpress={onPress}/>
    );
  }



  render() {

    const { goBack } = this.props.navigation;

    return (
      <View style={styles.container}>
        <ListView dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}/>
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
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (HistoricalList);
