import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback  } from 'react-native';

import { Button } from 'native-base';

import * as firebase from 'firebase';

import styles from "./styles";

import { Analytics, ScreenHit, Event } from 'expo-analytics';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { PieChart } from 'react-native-svg-charts';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions';


var {height, width} = Dimensions.get('window');

const Tabbar = require('../Tabbar/tabbar');


class Profile extends React.Component {

  componentDidMount(){
    const analytics = new Analytics('UA-126042363-1');
    analytics.hit(new ScreenHit('Profile'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));
    this.readUserData()
  }

  constructor(props) {
    super(props);
    this.state = {
      red_products:0,
      yellow_products:0,
      orange_products:0,
      green_products:0,
      darkgreen_products:0
    };

  }

  readUserData = () => {

      let userID=this.props.userUID


      var ref = firebase.database().ref('Scanned/'+userID+'/');
      var query = ref.orderByChild("score_color").equalTo('red');
      query.once("value", (snapshot)=> {
        snapshot.forEach((child)=> {
          this.setState({red_products:Object.keys(snapshot.val()).length})
        });
      });

      var ref = firebase.database().ref('Scanned/'+userID+'/');
      var query = ref.orderByChild("score_color").equalTo('yellow');
      query.once("value", (snapshot) =>{
        snapshot.forEach((child)=> {
          this.setState({yellow_products:Object.keys(snapshot.val()).length})
        });
      });

      var ref = firebase.database().ref('Scanned/'+userID+'/');
      var query = ref.orderByChild("score_color").equalTo('green');
      query.once("value", (snapshot)=> {
        snapshot.forEach((child)=> {
          this.setState({green_products:Object.keys(snapshot.val()).length})
        });
      });

      var ref = firebase.database().ref('Scanned/'+userID+'/');
      var query = ref.orderByChild("score_color").equalTo('orange');
      query.once("value", (snapshot)=> {
        snapshot.forEach((child)=> {
          this.setState({orange_products:Object.keys(snapshot.val()).length})
        });
      });

      var ref = firebase.database().ref('Scanned/'+userID+'/');
      var query = ref.orderByChild("score_color").equalTo('darkgreen');
      query.once("value", (snapshot)=> {
        snapshot.forEach((child)=> {
          this.setState({darkgreen_products:Object.keys(snapshot.val()).length})
        });
      });

  }



  render() {
    const { navigate } = this.props.navigation;

    const data = [ this.state.red_products, this.state.orange_products, this.state.yellow_products, this.state.green_products, this.state.darkgreen_products ]

        const colors=['red', 'orange', 'yellow', 'green', 'darkgreen']
        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
        const pieData = data
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: colors[index],
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }))

    return (
      <View style={styles.container}>
        <View style={{flex:1}}>
          <Text style={{marginTop:40,fontSize:24, fontFamily:'RobotoBold', color:'#9E9E9E', alignSelf:'center'}}>{this.props.userName} food</Text>
          <View style={{marginTop:20}}>
            <PieChart
                  style={ { height: 200 } }
                  data={ pieData }
                  colors={colors}
              />
              <View>
                <TouchableWithoutFeedback onPress={() => navigate('HistoricalList')}>
                  <View style={{marginTop:30, height:0.5, width:width*0.95, alignSelf:'center', backgroundColor:'#9E9E9E'}}/>
                  <View style={{flexDirection:'row'}}>
                    <View style={{height:15, width:15, borderRadius:15, backgroundColor:'darkgreen', marginLeft:30, marginTop:15}} />
                    <Text style={{fontSize:20, marginLeft:15, marginTop:11, fontFamily:'RobotoRegular'}}>Excellent</Text>
                    <View style={{flex:1}} />
                    <Text  style={{fontSize:20, marginRight:5, marginTop:13, fontFamily:'RobotoRegular'}}>{this.state.darkgreen_products}</Text>
                    <MaterialCommunityIcons style={{marginTop:16,marginRight:10}} name="chevron-right" size={20} color="#9E9E9E" />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={() => navigate('HistoricalList')}>
                  <View style={{marginTop:10, height:0.5, width:width*0.95, alignSelf:'center', backgroundColor:'#9E9E9E'}}/>
                  <View style={{flexDirection:'row'}}>
                    <View style={{height:15, width:15, borderRadius:15, backgroundColor:'green', marginLeft:30, marginTop:15}} />
                    <Text style={{fontSize:20, marginLeft:15, marginTop:11, fontFamily:'RobotoRegular'}}>Good</Text>
                    <View style={{flex:1}} />
                    <Text  style={{fontSize:20, marginRight:5, marginTop:13, fontFamily:'RobotoRegular'}}>{this.state.green_products}</Text>
                    <MaterialCommunityIcons style={{marginTop:16,marginRight:10}} name="chevron-right" size={20} color="#9E9E9E" />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={() => navigate('HistoricalList')}>
                  <View style={{marginTop:10, height:0.5, width:width*0.95, alignSelf:'center', backgroundColor:'#9E9E9E'}}/>
                  <View style={{flexDirection:'row'}}>
                    <View style={{height:15, width:15, borderRadius:15, backgroundColor:'yellow', marginLeft:30, marginTop:15}} />
                    <Text style={{fontSize:20, marginLeft:15, marginTop:11, fontFamily:'RobotoRegular'}}>Medium</Text>
                    <View style={{flex:1}} />
                    <Text  style={{fontSize:20, marginRight:5, marginTop:13, fontFamily:'RobotoRegular'}}>{this.state.yellow_products}</Text>
                    <MaterialCommunityIcons style={{marginTop:16,marginRight:10}} name="chevron-right" size={20} color="#9E9E9E" />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={() => navigate('HistoricalList')}>
                <View style={{marginTop:10, height:0.5, width:width*0.95, alignSelf:'center', backgroundColor:'#9E9E9E'}}/>
                  <View style={{flexDirection:'row'}}>
                    <View style={{height:15, width:15, borderRadius:15, backgroundColor:'orange', marginLeft:30, marginTop:15}} />
                    <Text style={{fontSize:20, marginLeft:15, marginTop:11, fontFamily:'RobotoRegular'}}>Regular</Text>
                    <View style={{flex:1}} />
                    <Text  style={{fontSize:20, marginRight:5, marginTop:13, fontFamily:'RobotoRegular'}}>{this.state.orange_products}</Text>
                    <MaterialCommunityIcons style={{marginTop:16,marginRight:10}} name="chevron-right" size={20} color="#9E9E9E" />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={() => navigate('HistoricalList')}>
                  <View style={{marginTop:10, height:0.5, width:width*0.95, alignSelf:'center', backgroundColor:'#9E9E9E'}}/>
                  <View style={{flexDirection:'row'}}>
                    <View style={{height:15, width:15, borderRadius:15, backgroundColor:'red', marginLeft:30, marginTop:15}} />
                    <Text style={{fontSize:20, marginLeft:15, marginTop:11, fontFamily:'RobotoRegular'}}>Bad</Text>
                    <View style={{flex:1}} />
                    <Text  style={{fontSize:20, marginRight:5, marginTop:13, fontFamily:'RobotoRegular'}}>{this.state.red_products}</Text>
                    <MaterialCommunityIcons style={{marginTop:16,marginRight:10}} name="chevron-right" size={20} color="#9E9E9E" />
                  </View>
                </TouchableWithoutFeedback>
                <View style={{marginTop:10, height:0.5, width:width*0.95, alignSelf:'center', backgroundColor:'#9E9E9E'}}/>
              </View>

            </View>
        </View>
        <Button style={{position:'absolute', bottom: 50, width:width*0.5, alignSelf:'center', flexDirection:'row'}}
          full
          rounded
          success
          onPress={() => navigate('Scan')}
        >
          <MaterialCommunityIcons style={{}} name="barcode-scan" size={30} color="white" />
          <Text style={[styles.textField,{color:'white', marginLeft:8}]}>Scan</Text>

        </Button>
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
        userName: state.getUserName,
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (Profile);
