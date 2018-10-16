import React from 'react';
import { StyleSheet, Text, View , Alert, Dimensions, TouchableWithoutFeedback} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

import styles from "./styles";

import { Analytics, ScreenHit, Event } from 'expo-analytics';

import axios from 'axios';

import { Button } from 'native-base';

import { Ionicons } from '@expo/vector-icons';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions';

var {height, width} = Dimensions.get('window');

const Tabbar = require('../Tabbar/tabbar');


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
          productInfo: null,
          unkownProduct:null,
    };
    this.props.getBarcode(null)
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = data => {
    const { getProductInfo } = this.props;
    this.props.getBarcode(JSON.stringify(data.data))
    axios.get('https://world.openfoodfacts.org/api/v0/product/'+JSON.stringify(data.data)+'.json')
    .then(response => {
      JSON.stringify(response.length>=100)?
      (this.setState({unkownProduct:false,loadedProductInfo:this.state.loadedProductInfo+1}), this.props.getProductInfo(response)
    ):(
      this.setState({unkownProduct:true})
    )});
  };

  componentDidUpdate(){
    if (this.state.unkownProduct==false && this.state.loadedProductInfo===1 && JSON.stringify(this.props.productInfo).length>10){
      const { navigate } = this.props.navigation;
      navigate('ProductDetail')
    }else if (this.state.unkownProduct==true){
      this.timeoutHandle = setTimeout(()=>{
          this.setState({ unkownProduct: null })
     }, 8000);
    }
  }

  componentWillUnmount(){
       clearTimeout(this.timeoutHandle);
  }

  addProduct = (barcode) => {
    const { navigate } = this.props.navigation;
    navigate('AddProduct')
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
                <View style={{borderColor:'white', borderRadius:10, borderWidth:2, width:width*0.8, flex:1, alignSelf:'center'}}>
                  <View style={{backgroundColor:'red', height:1.5, width:width*0.65, alignSelf:'center', marginTop: height*0.12}}>
                  </View>
                </View>
              </View>
              {this.state.unkownProduct==true?(
                <View style={{position:'absolute',bottom:60,height:height*0.2, width:width*0.8, backgroundColor:'yellow'}}>
                  <View style={{flexDirection:'row'}}>
                    <View style={{backgroundColor:'#9E9E9E', borderRadius:10, height:10, width:10}}></View>
                    <Text style={[styles.textField,{marginLeft:8, color:'#9E9E9E'}]}>Product not Found</Text>
                  </View>
                  <Button style={{width:width*0.5, marginTop:30, alignSelf:'center', flexDirection:'row'}}
                    full
                    rounded
                    success
                    onPress={() => this.addProduct()}
                  >
                    <Text style={{color:'white', marginLeft:8}}>Add it to Zebra</Text>
                  </Button>
                </View>
              ):(
                <View>
                </View>
              )}
            </View>
        }
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
    productInfo: state.getProductInfo,
    barcode: state.getBarcode,
    //recipeCount: state.recipeCount,
    //highscore: state.highscore
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (Scan);
