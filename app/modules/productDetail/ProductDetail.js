import React from 'react';
import { StyleSheet, Text, View , Alert, Dimensions, Image, ScrollView} from 'react-native';

import styles from "./styles";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions';

import { Analytics, ScreenHit, Event } from 'expo-analytics';

import { Button } from 'native-base';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as firebase from 'firebase';


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

    //this.saveProduct();
    this.readUserData();
  }



  readUserData = () => {
      const productInfo = JSON.parse(this.state.productInfo);
      let product_exist=false;

      let userID=this.props.userUID

      var ref = firebase.database().ref('Scanned/'+userID+'/'+productInfo.data.code+'/');
      var query = ref.orderByChild("code").equalTo(productInfo.data.code);
      query.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
        });
        if(snapshot.val()==null){
          /////////////////////////// Save Product
          let score=50;
          if (productInfo.data.product.nutriments.nutritionscorefr_100g === undefined){
            score=50;
          }else{
            score=productInfo.data.product.nutriments.nutritionscorefr_100g;
          }

          let image_url='';
          if (productInfo.data.product.image_front_url=== undefined){
            image_url='';
          }else{
            image_url=productInfo.data.product.image_front_url;
          }

          let product_name='';
          if (productInfo.data.product.product_name === undefined){
            product_name='';
          }else{
            product_name=productInfo.data.product.product_name;
          }

          let product_brand='';
          if (productInfo.data.product.brands === undefined){
            product_brand='';
          }else{
            product_brand=productInfo.data.product.brands;
          }

          let code=productInfo.data.code

          let score_color='';
          if (score>80){
            score_color='darkgreen'
          } else if(score>=60 && score<80){
            score_color='green'
          } else if (score>=40 && score<60){
            score_color='yellow'
          } else if (score>=20 && score<40){
            score_color='orange'
          }else{
            score_color='red'
          }

          firebase.database().ref('Scanned/'+userID+'/'+productInfo.data.code+'/').set({
              score,
              score_color,
              image_url,
              product_name,
              product_brand,
              code
          }).then((data)=>{
              //success callback
              console.log('data ' , data)
          }).catch((error)=>{
              //error callback
              console.log('error ' , error)
          })
          ////////////////////////////
        }else{
          console.log('Product already exist')
        }
      });

  }


  render() {
    const { navigate } = this.props.navigation;

    const productInfo = JSON.parse(this.state.productInfo);

    let energy=undefined
    if (productInfo.data.product.nutriments.energy_unit=='kcal'){
      energy = productInfo.data.product.nutriments.energy_100g
    }else{
      energy = productInfo.data.product.nutriments.energy_100g*0.239006
    }

    let fat = ''
    if(productInfo.data.product.nutriments.saturatedfat_100g===undefined){
      fat=0
    }else{
      fat = productInfo.data.product.nutriments.saturatedfat_100g
    }

    let sugar = ''
    if(productInfo.data.product.nutriments.sugars_100g===undefined){
      sugar=0
    }else{
      sugar = productInfo.data.product.nutriments.sugars_100g
    }

    const sodium = productInfo.data.product.nutriments.sodium_100g
    const fruits = productInfo.data.product.nutriments.fruitsvegetablesnuts_100g_estimate
    const fiber = productInfo.data.product.nutriments.fiber_100g
    const proteins = productInfo.data.product.nutriments.proteins_100g
    const salt = productInfo.data.product.nutriments.salt_100g
    const score = productInfo.data.product.nutriments.nutritionscorefr_100g

    const additives= productInfo.data.product.additives_n

    let category=''
    if (productInfo.data.product.categories_hierarchy === undefined){
      category=''
    } else {
      if(productInfo.data.product.categories_hierarchy.length>0){
        category=productInfo.data.product.categories_hierarchy[0].split(':')[1]
      }else{
        category=''
      }
    }

    console.log('Category: '+category)
    console.log('Score: '+score)
    console.log('Energy: '+energy)
    console.log('Fat: '+fat)
    console.log('Sugar: '+sugar)
    console.log('Fruits: '+fruits)
    console.log('Fiber: '+fiber)
    console.log('Proteins: '+proteins)
    console.log('Salt: '+salt)
    console.log('------------------------------')
    console.log('Nutriments: '+JSON.stringify(productInfo.data.product.nutriments))


    let fat_score=''
    let sugar_score=''
    let energy_score=''
    let salt_score=''
    let proteins_score=''
    let fiber_score=''
    let fruits_score=''
    let additives_score=''

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

    if (additives>0) {
      additives_score='bad'
    }

    let has_bad=(energy_score=='bad' | salt_score=='bad' | sugar_score=='bad' | fat_score=='bad' | additives_score=='bad' )
    let has_good=(energy_score=='good' | salt_score=='good' | sugar_score=='good' | fat_score=='good' | proteins_score=='good' | fiber_score=='good' | fruits_score=='good')


    return (
      <View style={styles.container}>
        <View style={styles.cardContianer}>
          <View>
            <Image style={styles.backgroundCardImage} source={require('../../assets/images/background.png')}/>
          </View>
        </View>
        <View  style={styles.productInfoContainer}>
          <View style={{height:10}}>
          </View>
          <ScrollView>
            <View style={styles.generalProductInfo}>
              <View style={styles.productImageContainer}>
                <Image
                  style={styles.productImage}
                  source={{uri: productInfo.data.product.image_front_url}}
                />
                <View style={styles.productNameContainer}>
                  <Text style={styles.productName}>{productInfo.data.product.product_name}</Text>
                  <Text style={styles.productBrand}>{productInfo.data.product.brands}</Text>
                  <View style={style.productScoreContainer}>
                    {score>=80? (
                      <View style={[styles.productScore,styles.productScoreExcellent]}></View>
                    ):(
                      <View>
                        {score>=60 && score<80? (
                          <View style={[styles.productScore, styles.productScoreGood]}></View>
                        ):(
                          <View>
                            {score>=40 && score<60? (
                              <View style={[styles.productScore, styles.productScoreMedium]}></View>
                            ):(
                              <View>
                                {score>=20 && score<40? (
                                  <View style={[styles.productScore, styles.productScoreRegular]}></View>
                                ):(
                                  <View style={[styles.productScore, styles.productScoreBad]}></View>
                                )}
                              </View>
                            )}
                          </View>
                        )}
                      </View>
                    )}
                    <View style={{marginLeft:10 ,flexDirection:'column'}}>
                      <Text style={styles.productScoreValue}>{score}/100</Text>
                      {score>=80? (
                        <Text style={styles.productScoreText}>Exellent</Text>
                      ):(
                        <View>
                          {score>=60 && score<80? (
                            <Text style={styles.productScoreText}>Good</Text>
                          ):(
                            <View>
                              {score>=40 && score<60? (
                                <Text style={styles.productScoreText}>Regular</Text>
                              ):(
                                <View>
                                  {score>=20 && score<40? (
                                    <Text style={styles.productScoreText}>Poor</Text>
                                  ):(
                                    <Text style={styles.productScoreText}>Bad</Text>
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
            </View>


            {has_bad>0?(
            <View style={[styles.productCardContainer,{height:300}]}>
              <View style={styles.productCardTitle}>
                <Text style={styles.productCardTitleText}>Product benefits</Text>
              </View>
              {energy_score=='bad'?(
                <View>
                  <View style={{height:30, width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
                    <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Energy: {energy} kCal</Text>
                  </View>
                  <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                </View>
              ):(
                <View/>
              )}
              {salt_score=='bad'?(
                <View>
                  <View style={{ height:30, width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
                    <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Salt: {salt} g</Text>
                  </View>
                  <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                </View>
              ):(
                <View/>
              )}
              {sugar_score=='bad'?(
                <View>
                  <View style={{ height:30, width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
                    <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Sugar: {sugar} g</Text>
                  </View>
                  <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                </View>
              ):(
                <View/>
              )}
              {fat_score=='bad'?(
                <View>
                  <View style={{ height:30, width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
                    <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Fat: {fat} g</Text>
                  </View>
                  <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                </View>
              ):(
                <View/>
              )}
              {additives_score=='bad'?(
                <View>
                  <View style={{ height:30, width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
                    <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Additives: {additives}</Text>
                  </View>
                  <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                </View>
              ):(
                <View/>
              )}
            </View>
            ):(
              <View/>
            )}


            {has_good>0?(
            <View style={[styles.goodProductCardContainer,{height:300}]}>
              <View style={styles.productCardTitle}>
                <Text style={styles.productCardTitleText}>Product benefits</Text>
              </View>
              {energy_score=='good'?(
                <View>
                  <View style={{ height:30, width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
                    <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Energy: {energy} kCal</Text>
                  </View>
                  <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                </View>
              ):(
                <View/>
              )}
              {salt_score=='good'?(
                <View>
                  <View style={{ height:30, width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
                    <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Salt: {salt} g</Text>
                  </View>
                  <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                </View>
              ):(
                <View/>
              )}
              {sugar_score=='good'?(
                <View>
                  <View style={{ height:30, width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
                    <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Sugar: {sugar} g</Text>
                  </View>
                  <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                </View>
              ):(
                <View/>
              )}
              {fat_score=='good'?(
                <View>
                  <View style={{ height:30, width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
                    <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Fat: {fat} g</Text>
                  </View>
                  <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                </View>
              ):(
                <View/>
              )}
              {proteins_score=='good'?(
                <View>
                  <View style={{ height:30, width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
                    <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Proteins: {proteins} g</Text>
                  </View>
                  <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                </View>
              ):(
                <View/>
              )}
              {fiber_score=='good'?(
                <View>
                  <View style={{ height:30, width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
                    <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Fiber: {fiber} g</Text>
                  </View>
                  <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                </View>
              ):(
                <View/>
              )}
              {fruits_score=='good'?(
                <View>
                  <View style={{ height:30, width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'column'}}>
                    <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:4}}>Fruits: {fruits} %</Text>
                  </View>
                  <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                </View>
              ):(
                <View/>
              )}
            </View>
          ):(
            <View/>
          )}
          </ScrollView>
        </View>
        <Button style={styles.scanButton}
          full
          rounded
          success
          onPress={() => {navigate('Scan')}}
        >
          <MaterialCommunityIcons style={{}} name="barcode-scan" size={30} color="white" />
          <Text style={[styles.textField,styles.scanButtonText]}>Scan</Text>
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
        userUID: state.getUserUID,
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (ProductDetail);
