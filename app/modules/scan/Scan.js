import React from 'react';
import { StyleSheet, Text, View , Alert, Dimensions, Button, TouchableWithoutFeedback} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

import styles from "./styles";

import { Analytics, ScreenHit, Event } from 'expo-analytics';

import axios from 'axios';

import { Ionicons } from '@expo/vector-icons';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions';

var {height, width} = Dimensions.get('window');


class Scan extends React.Component {



  componentDidMount() {
    const analytics = new Analytics('UA-126042363-1');
    analytics.hit(new ScreenHit('Scan'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));
    this._requestCameraPermission();


  }

  constructor(props) {
    super(props);
    this.state = {
          loadedProductInfo:0,
          hasCameraPermission: null,
          productInfo: null
    };
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = data => {
    const { getProductInfo } = this.props;
    axios.get('https://world.openfoodfacts.org/api/v0/product/'+JSON.stringify(data.data)+'.json')
    .then(response => {this.setState({loadedProductInfo:this.state.loadedProductInfo+1}),{getProductInfo}});
  };

  componentDidUpdate(){
    if (this.state.loadedProductInfo===1){
      const { navigate } = this.props.navigation;
      navigate('ProductDetail')
    }
  }

  render() {

    const { goBack } = this.props.navigation;

    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ?
          <Text>Requesting for camera permission</Text> :
          this.state.hasCameraPermission === false ?
            <Text>Camera permission is not granted</Text> :
            <View>
              <BarCodeScanner
                onBarCodeRead={this._handleBarCodeRead}
                style={{ height: height+1, width: width }}>
                <View style={{marginTop:30,marginLeft:20, height:40, width:40}}>
                  <TouchableWithoutFeedback style={{flex:1}} onPress={() => goBack()}>
                    <Ionicons style={{}} name="ios-arrow-back" size={30} color="white" />
                  </TouchableWithoutFeedback>
                </View>
              </BarCodeScanner>
              <View style={{width:width*0.8, height:height*0.3, position:'absolute', bottom:height*0.4, alignSelf:'center'}}>
                <Text style={{alignSelf:'center', fontSize: 18, color:'white',fontFamily:'RobotoLight',marginBottom:12}}>Scan a product barcode</Text>
                <View style={{borderColor:'white', borderRadius:10, borderWidth:2, width:width*0.8, flex:1, alignSelf:'center'}}/>
              </View>
            </View>
        }
      </View>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators (ActionCreators, dispatch);
}

function mapStateToProps (state) {
  return {
    getProductInfo: state.productInfo,
    //recipeCount: state.recipeCount,
    //highscore: state.highscore
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (Scan);
