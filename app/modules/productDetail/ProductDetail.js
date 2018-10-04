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

    const energy = productInfo.data.product.nutriments.energy_100g
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
            <View style={{flexDirection:'row', marginTop: 40, alignItems:'center'}}>
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

        {energy>2010 && category!='beverages'?(
          <Text style={{fontSize:18, fontFamily:'RobotoLight'}}>Energy: {energy}</Text>
        ):(
          <View>
            {energy>150 && category=='beverages'?(
              <Text style={{fontSize:18, fontFamily:'RobotoLight'}}>Energy: {energy}</Text>
            ):(
              <View></View>
            )}
          </View>
        )}
        {fat>6 && category!='beverages'?(
          <Text style={{fontSize:18, fontFamily:'RobotoLight'}}>Fat: {fat}</Text>
        ):(
          <View></View>
        )}
        {sugar>27 && category!='beverages'?(
          <Text style={{fontSize:18, fontFamily:'RobotoLight'}}>Sugar: {sugar}</Text>
        ):(
          <View>
            {sugar>7.5 && category=='beverages'?(
              <Text style={{fontSize:18, fontFamily:'RobotoLight'}}>Sugar: {sugar}</Text>
            ):(
              <View></View>
            )}
          </View>
        )}
        {sodium>540 && category!='beverages'?(
          <Text style={{fontSize:18, fontFamily:'RobotoLight'}}>Sodium: {sodium}</Text>
        ):(
          <View></View>
        )}
        {fruits<60 && category!='beverages'?(
          <Text style={{fontSize:18, fontFamily:'RobotoLight'}}>Fruits: {fruits}</Text>
        ):(
          <View>
            {fruits<60 && category=='beverages'?(
              <Text style={{fontSize:18, fontFamily:'RobotoLight'}}>Fruits: {fruits}</Text>
            ):(
              <View></View>
            )}
          </View>
        )}
        {fiber<1.9 && category!='beverages'?(
          <Text style={{fontSize:18, fontFamily:'RobotoLight'}}>Fiber: {fiber}</Text>
        ):(
          <View></View>
        )}
        {proteins<3.2 && category!='beverages'?(
          <Text style={{fontSize:18, fontFamily:'RobotoLight'}}>Proteins: {proteins}</Text>
        ):(
          <View></View>
        )}
        <Text style={{fontSize:18, fontFamily:'RobotoLight'}}>{salt}</Text>
        <Text style={{fontSize:18, fontFamily:'RobotoLight'}}>{category}</Text>
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
