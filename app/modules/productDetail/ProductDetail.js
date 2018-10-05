import React from 'react';
import { StyleSheet, Text, View , Alert, Dimensions, Image} from 'react-native';

import styles from "./styles";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions';

import { Analytics, ScreenHit, Event } from 'expo-analytics';

import { Button } from 'native-base';

import { MaterialCommunityIcons } from '@expo/vector-icons';


var {height, width} = Dimensions.get('window');


class ProductDetail extends React.Component {

  componentDidMount(){
    const analytics = new Analytics('UA-126042363-1');
    analytics.hit(new ScreenHit('ProductDetail'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));

  }

  constructor(props) {
    super(props);
    this.state = {
      productInfo: JSON.stringify(this.props.productInfo).replace(/-/gi,''),
    };
  }


  render() {
    const { navigate } = this.props.navigation;

    const productInfo = JSON.parse(this.state.productInfo);

    const energy = productInfo.data.product.nutriments.energy_100g*0.239006
    const fat = productInfo.data.product.nutriments.saturatedfat_100g
    const sugar = productInfo.data.product.nutriments.sugars_100g
    const sodium = productInfo.data.product.nutriments.sodium_100g
    const fruits = productInfo.data.product.nutriments.fruitsvegetablesnuts_100g_estimate
    const fiber = productInfo.data.product.nutriments.fiber_100g
    const proteins = productInfo.data.product.nutriments.proteins_100g
    const salt = productInfo.data.product.nutriments.salt_100g
    const score = productInfo.data.product.nutriments.nutritionscorefr_100g
    //console.log("fat:"+JSON.stringify(productInfo.data.product.categories_hierarchy))
    let category=''
    if (productInfo.data.product.categories_hierarchy==undefined){
      category=''
    } else {
      category=productInfo.data.product.categories_hierarchy[0].split(':')[1]
    }

    let fat_score=''
    let sugar_score=''
    let energy_score=''
    let salt_score=''
    let protein_score=''
    let fiber_score=''
    let fruits_score=''

    if (category=='beverages'){
      if (salt>0.7){
        salt_score='bad'
      }else if (salt<=0.7){
        salt_score='good'
      }
      if (sugar>3){
        sugar_score='bad'
      }else if (sugar<=3){
        sugar_score='good'
      }
      if (energy>14){
        energy_score='bad'
      }else if (energy<=14){
        energy_score='good'
      }
      if (fat>3){
        fat_score='bad'
      }else if (fat<=3){
        fat_score='good'
      }
    } else{
      if (salt>0.92){
        salt_score='bad'
      }else if (salt<=0.92){
        salt_score='good'
      }
      if (sugar>18){
        sugar_score='bad'
      }else if (sugar<=18){
        sugar_score='good'
      }
      if (energy>360){
        energy_score='bad'
      }else if (energy<=360){
        energy_score='good'
      }
      if (fat>4){
        fat_score='bad'
      }else if (fat<=4){
        fat_score='good'
      }
    }

    if (proteins>0) {
      proteins_score='good'
    }

    if (fiber>0) {
      fiber_score='good'
    }

    if (fruits>0) {
      fruits_score='good'
    }



    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row', marginTop:40, marginLeft:20}}>
          <Image
            style={{width:100, resizeMode:'contain'}}
            source={{uri: productInfo.data.product.image_front_url}}
          />
          <View style={{flexDirection:'column',marginLeft:20,}}>
            <Text style={{fontSize:24, fontFamily:'RobotoBold'}}>{productInfo.data.product.product_name}</Text>
            <Text style={{fontSize:16, fontFamily:'RobotoLight', color:'#9E9E9E'}}>{productInfo.data.product.brands}</Text>
            <View style={{flexDirection:'row', marginTop: 20, alignItems:'center'}}>
              {score>=80? (
                <View style={{backgroundColor:'darkgreen', borderRadius:20, height:15, width:15, alignSelf:'center'}}></View>
              ):(
                <View>
                  {score>=60 && score<80? (
                    <View style={{backgroundColor:'green', borderRadius:20, height:15, width:15, alignSelf:'center'}}></View>
                  ):(
                    <View>
                      {score>=40 && score<60? (
                        <View style={{backgroundColor:'yellow', borderRadius:20, height:15, width:15, alignSelf:'center'}}></View>
                      ):(
                        <View>
                          {score>=20 && score<40? (
                            <View style={{backgroundColor:'orange', borderRadius:20, height:15, width:15, alignSelf:'center'}}></View>
                          ):(
                            <View style={{backgroundColor:'red', borderRadius:20, height:15, width:15, alignSelf:'center'}}></View>
                          )}
                        </View>
                      )}
                    </View>
                  )}
                </View>
              )}
              <View style={{marginLeft:10 ,flexDirection:'column'}}>
                <Text style={{fontSize:18, fontFamily:'RobotoBold'}}>{score}/100</Text>
                {score>=80? (
                  <Text style={{fontSize:16, fontFamily:'RobotoLight', color:'#9E9E9E'}}>Exellent</Text>
                ):(
                  <View>
                    {score>=60 && score<80? (
                      <Text style={{fontSize:16, fontFamily:'RobotoLight', color:'#9E9E9E'}}>Good</Text>
                    ):(
                      <View>
                        {score>=40 && score<60? (
                          <Text style={{fontSize:16, fontFamily:'RobotoLight', color:'#9E9E9E'}}>Regular</Text>
                        ):(
                          <View>
                            {score>=20 && score<40? (
                              <Text style={{fontSize:16, fontFamily:'RobotoLight', color:'#9E9E9E'}}>Poor</Text>
                            ):(
                              <Text style={{fontSize:16, fontFamily:'RobotoLight', color:'#9E9E9E'}}>Bad</Text>
                            )}
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        if(energy_score=='bad' | salt_score=='bad' | sugar_score=='bad' | fat_score=='bad' ){
          <View style={{marginTop:35, height:50, width:width, backgroundColor:'#eaeaea', alignSelf:'center', flexDirection:'column'}}>
            <Text style={{fontSize:18, fontFamily:'RobotoRegular', fontWeight:'200', marginLeft:10, marginTop:14}}>Product defects</Text>
          </View>
        }
        {energy_score=='bad'?(
          <View>
            <View style={{height:30, width:width, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
              <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Energy: {energy} kCal</Text>
            </View>
            <View style={{height:0.5, width:width, backgroundColor:'#F0F0F0'}}/>
          </View>
        ):(
          <View/>
        )}
        {salt_score=='bad'?(
          <View>
            <View style={{ height:30, width:width, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
              <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Salt: {salt} g</Text>
            </View>
            <View style={{height:0.5, width:width, backgroundColor:'#F0F0F0'}}/>
          </View>
        ):(
          <View/>
        )}
        {sugar_score=='bad'?(
          <View>
            <View style={{ height:30, width:width, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
              <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Sugar: {sugar} g</Text>
            </View>
            <View style={{height:0.5, width:width, backgroundColor:'#F0F0F0'}}/>
          </View>
        ):(
          <View/>
        )}
        {fat_score=='bad'?(
          <View>
            <View style={{ height:30, width:width, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
              <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Fat: {fat} g</Text>
            </View>
            <View style={{height:0.5, width:width, backgroundColor:'#F0F0F0'}}/>
          </View>
        ):(
          <View/>
        )}

        if(energy_score=='good' | salt_score=='good' | sugar_score=='good' | fat_score=='good' | proteins_score='good' | fiber_soce=='good' | fruits_score=='good' ){
          <View style={{marginTop:25, height:50, width:width, backgroundColor:'#eaeaea', alignSelf:'center', flexDirection:'column'}}>
            <Text style={{fontSize:18, fontFamily:'RobotoRegular', fontWeight:'200', marginLeft:10, marginTop:14}}>Product benefits</Text>
          </View>
        }
        {energy_score=='good'?(
          <View>
            <View style={{ height:30, width:width, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
              <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Energy: {energy} kCal</Text>
            </View>
            <View style={{height:0.5, width:width, backgroundColor:'#F0F0F0'}}/>
          </View>
        ):(
          <View/>
        )}
        {salt_score=='good'?(
          <View>
            <View style={{ height:30, width:width, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
              <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Salt: {salt} g</Text>
            </View>
            <View style={{height:0.5, width:width, backgroundColor:'#F0F0F0'}}/>
          </View>
        ):(
          <View/>
        )}
        {sugar_score=='good'?(
          <View>
            <View style={{ height:30, width:width, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
              <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Sugar: {sugar} g</Text>
            </View>
            <View style={{height:0.5, width:width, backgroundColor:'#F0F0F0'}}/>
          </View>
        ):(
          <View/>
        )}
        {fat_score=='good'?(
          <View>
            <View style={{ height:30, width:width, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
              <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Fat: {fat} g</Text>
            </View>
            <View style={{height:0.5, width:width, backgroundColor:'#F0F0F0'}}/>
          </View>
        ):(
          <View/>
        )}
        {proteins_score=='good'?(
          <View>
            <View style={{ height:30, width:width, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
              <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Proteins: {proteins} g</Text>
            </View>
            <View style={{height:0.5, width:width, backgroundColor:'#F0F0F0'}}/>
          </View>
        ):(
          <View/>
        )}
        {fiber_score=='good'?(
          <View>
            <View style={{ height:30, width:width, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
              <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Fiber: {fiber} g</Text>
            </View>
            <View style={{height:0.5, width:width, backgroundColor:'#F0F0F0'}}/>
          </View>
        ):(
          <View/>
        )}
        {fruits_score=='good'?(
          <View>
            <View style={{ height:30, width:width, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
              <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Fruits: {fruits} %</Text>
            </View>
            <View style={{height:0.5, width:width, backgroundColor:'#F0F0F0'}}/>
          </View>
        ):(
          <View/>
        )}

        <Button style={{position:'absolute', bottom: 20, width:width*0.8, alignSelf:'center'}}
          full
          rounded
          success
          onPress={() => navigate('Scan')}
        >
          <MaterialCommunityIcons style={{}} name="barcode-scan" size={30} color="white" />
          <Text style={[styles.textField,{color:'white', marginLeft:8}]}>Scan</Text>
        </Button>
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
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (ProductDetail);
