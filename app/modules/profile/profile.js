import React from 'react';
import { StyleSheet, Text, View, Dimensions  } from 'react-native';

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
      red_products:null,
      yellow_products:null,
      orange_products:null,
      green_products:null,
      darkgreen_products:null
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
          <View style={{marginTop:100}}>
            <PieChart
                  style={ { height: 200 } }
                  data={ pieData }
                  colors={colors}
              />
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
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (Profile);
