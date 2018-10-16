import React from 'react';
import { StyleSheet, Text, View , Alert, Dimensions, Image, ScrollView, TouchableOpacity} from 'react-native';

import styles from "./styles";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions';

import { Analytics, ScreenHit, Event } from 'expo-analytics';

import { Button } from 'native-base';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as firebase from 'firebase';

import I18n from 'react-native-i18n'


var {height, width} = Dimensions.get('window');

const Tabbar = require('../Tabbar/tabbar');

import * as theme from '../../styles/theme';
const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;


class ProductDetail extends React.Component {

  componentWillMount(){
    I18n.initAsync();
  }

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

          let created_at = Math.floor(Date.now() / 1000);

          firebase.database().ref('Scanned/'+userID+'/'+productInfo.data.code+'/').set({
              score,
              score_color,
              image_url,
              product_name,
              product_brand,
              code,
              created_at
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
      energy=+energy.toFixed(2)
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

    let sodium = productInfo.data.product.nutriments.sodium_100g
    let fruits = productInfo.data.product.nutriments.fruitsvegetablesnuts_100g_estimate
    let fiber = productInfo.data.product.nutriments.fiber_100g
    let proteins = productInfo.data.product.nutriments.proteins_100g
    let salt = productInfo.data.product.nutriments.salt_100g
    let score = productInfo.data.product.nutriments.nutritionscorefr_100g

    let additives= productInfo.data.product.additives_n

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

    let fat_color=null
    let sugar_color=null
    let energy_color=null
    let salt_color=null
    let proteins_color=null
    let fiber_color=null
    let fruits_color=null
    let additives_color=null

    let bad_score=0
    let good_score=0

    if (category=='beverages'){
      if (salt>0.7){
        salt_score='bad'
        bad_score=bad_score+1
        if (salt>1.4){
          salt_color=color.scoreBad
        }else{
          salt_color=color.scoreRegular
        }
      }else if (salt<=0.7){
        salt_score='good'
        good_score=good_score+1
        if(salt<=0.23){
          salt_color=color.scoreExcellent
        }else{
          salt_color=color.scoreGood
        }
      }
      if (sugar>3){
        sugar_score='bad'
        bad_score=bad_score+1
        if(sugar>7){
          sugar_color=color.scoreBad
        }else{
          sugar_color=color.scoreRegular
        }
      }else if (sugar<=3){
        sugar_score='good'
        good_score=good_score+1
        if(sugar<=1.5){
          sugar_color=color.scoreExcellent
        }else{
          sugar_color=color.scoreGood
        }
      }
      if (energy>14){
        energy_score='bad'
        bad_score=bad_score+1
        if(energy>35){
          energy_color=color.scoreBad
        }else{
          energy_color=color.scoreRegular
        }
      }else if (energy<=14){
        energy_score='good'
        good_score=good_score+1
        if(energy<=1){
          energy_color=color.scoreExcellent
        }else{
          energy_color=color.scoreGood
        }
      }
      if (fat>3){
        fat_score='bad'
        bad_score=bad_score+1
        if(fat>6){
          fat_color=color.scoreBad
        }else{
          fat_color=color.scoreRegular
        }
      }else if (fat<=3){
        fat_score='good'
        good_score=good_score+1
        if(fat<=1){
          fat_color=color.scoreExcellent
        }else{
          fat_color=color.scoreGood
        }
      }
    } else{
      if (salt>0.92){
        salt_score='bad'
        bad_score=bad_score+1
        if(salt>1.62){
          salt_color=color.scoreBad
        }else{
          salt_color=color.scoreRegular
        }
      }else if (salt<=0.92){
        salt_score='good'
        good_score=good_score+1
        if(salt<=0.46){
          salt_color=color.scoreExcellent
        }else{
          salt_color=color.scoreGood
        }
      }
      if (sugar>18){
        sugar_score='bad'
        bad_score=bad_score+1
        if(sugar>31){
          sugar_color=color.scoreBad
        }else{
          sugar_color=color.scoreRegular
        }
      }else if (sugar<=18){
        sugar_score='good'
        good_score=good_score+1
        if(sugar<=9){
          sugar_color=color.scoreExcellent
        }else{
          sugar_color=color.scoreGood
        }
      }
      if (energy>360){
        energy_score='bad'
        bad_score=bad_score+1
        if(energy>560){
          energy_color=color.scoreBad
        }else{
          energy_color=color.scoreRegular
        }
      }else if (energy<=360){
        energy_score='good'
        good_score=good_score+1
        if(energy<=160){
          energy_color=color.scoreExcellent
        }else{
          energy_color=color.scoreGood
        }
      }
      if (fat>4){
        fat_score='bad'
        bad_score=bad_score+1
        if(fat>7){
          fat_color=color.scoreBad
        }else{
          fat_color=color.scoreRegular
        }
      }else if (fat<=4){
        fat_score='good'
        good_score=good_score+1
        if(fat<=2){
          fat_color=color.scoreExcellent
        }else{
          fat_color=color.scoreGood
        }
      }
    }

    if (proteins>0) {
      proteins_score='good'
      good_score=good_score+1
      if(proteins>8){
        proteins_color=color.scoreExcellent
      }else{
        proteins_color=color.scoreGood
      }
    }

    if (fiber>0) {
      fiber_score='good'
      good_score=good_score+1
      if(fiber>3.5){
        fiber_color=color.scoreExcellent
      }else{
        fiber_color=color.scoreGood
      }
    }

    if (fruits>0) {
      fruits_score='good'
      good_score=good_score+1
      if(fruits>80){
        fruits_color=color.scoreExcellent
      }else{
        fruits_color=color.scoreGood
      }
    }

    if (additives>0) {
      additives_score='bad'
      bad_score=bad_score+1
      additives_color=color.scoreBad
    }

    let has_bad=(energy_score=='bad' | salt_score=='bad' | sugar_score=='bad' | fat_score=='bad' | additives_score=='bad' )
    let has_good=(energy_score=='good' | salt_score=='good' | sugar_score=='good' | fat_score=='good' | proteins_score=='good' | fiber_score=='good' | fruits_score=='good')



    const { goBack } = this.props.navigation;

    return (
      <View style={styles.container}>




        <View style={{height:40, marginTop:20, flexDirection:'row'}}>
          <TouchableOpacity style={{height:150,width:150}} onPress={() => goBack()}>
            <MaterialCommunityIcons style={{marginTop:10,marginLeft:15}} name="close" size={30} color="#9E9E9E" />
          </TouchableOpacity>
          <View style={{flex:1}}>
            <Text style={{fontFamily:'RobotoBold', fontWeight:'400', fontSize:20, color:'#9E9E9E', marginTop:12, marginLeft:-140, textAlign:'center'}}>Product Detail</Text>
          </View>
        </View>
        <ScrollView style={{marginTop:10}}>
        <View style={styles.cardContianer}>
          <View>
            <Image style={styles.backgroundCardImage} source={require('../../assets/images/background.png')}/>
            </View>
          </View>
          <View style={styles.generalProductInfo}>
            <View style={styles.productImageContainer}>
              <Image
                style={styles.productImage}
                source={{uri: productInfo.data.product.image_front_url}}
              />
              <View style={styles.productNameContainer}>
                <Text style={styles.productName}>{productInfo.data.product.product_name}</Text>
                <Text style={styles.productBrand}>{productInfo.data.product.brands}</Text>
                <View style={styles.productScoreContainer}>
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

          <View  style={styles.productInfoContainer}>


              {has_bad>0?(
              <View style={[styles.productCardContainer,{height:50*bad_score+55}]}>
                <View style={styles.productCardTitle}>
                  <Text style={styles.productCardTitleText}>Product handicap</Text>
                </View>
                {energy_score=='bad'?(
                  <View>
                    <View style={{width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'row'}}>
                      <Image style={styles.nutrientIcon} source={require('../../assets/images/calories_icon.png')}/>
                      <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:15}}>Energy: {energy} kCal</Text>
                      <View style={{flex:1}}/>
                      <View style={{height:15, width:15, borderRadius:15, backgroundColor:energy_color, marginTop:20, marginRight:15}}/>
                    </View>
                    <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                  </View>
                ):(
                  <View/>
                )}
                {salt_score=='bad'?(
                  <View>
                    <View style={{ width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'row'}}>
                      <Image style={styles.nutrientIcon} source={require('../../assets/images/salt_icon.png')}/>
                      <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:15}}>Salt: {salt} g</Text>
                      <View style={{flex:1}}/>
                      <View style={{height:15, width:15, borderRadius:15, backgroundColor:salt_color, marginTop:20, marginRight:15}}/>
                    </View>
                    <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                  </View>
                ):(
                  <View/>
                )}
                {sugar_score=='bad'?(
                  <View>
                    <View style={{ width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'row'}}>
                      <Image style={styles.nutrientIcon} source={require('../../assets/images/sugar_icon.png')}/>
                      <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:15}}>Sugar: {sugar} g</Text>
                      <View style={{flex:1}}/>
                      <View style={{height:15, width:15, borderRadius:15, backgroundColor:sugar_color, marginTop:20, marginRight:15}}/>
                    </View>
                    <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                  </View>
                ):(
                  <View/>
                )}
                {fat_score=='bad'?(
                  <View>
                    <View style={{width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'row'}}>
                      <Image style={styles.nutrientIcon} source={require('../../assets/images/fat_icon.png')}/>
                      <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:15}}>Fat: {fat} g</Text>
                      <View style={{flex:1}}/>
                      <View style={{height:15, width:15, borderRadius:15, backgroundColor:fat_color, marginTop:20, marginRight:15}}/>
                    </View>
                    <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                  </View>
                ):(
                  <View/>
                )}
                {additives_score=='bad'?(
                  <View>
                    <View style={{ width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'row'}}>
                      <Image style={styles.nutrientIcon} source={require('../../assets/images/additives_icon.png')}/>
                      <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:15}}>Additives: {additives}</Text>
                      <View style={{flex:1}}/>
                      <View style={{height:15, width:15, borderRadius:15, backgroundColor:additives_color, marginTop:20, marginRight:15}}/>
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
              <View style={[styles.productCardContainer,{height:50*good_score+55}]}>
                <View style={styles.productCardTitle}>
                  <Text style={styles.productCardTitleText}>Product banefits</Text>
                </View>
                {energy_score=='good'?(
                  <View>
                    <View style={{ width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'row'}}>
                      <Image style={styles.nutrientIcon} source={require('../../assets/images/calories_icon.png')}/>
                      <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:15}}>Energy: {energy} kCal</Text>
                      <View style={{flex:1}}/>
                      <View style={{height:15, width:15, borderRadius:15, backgroundColor:energy_color, marginTop:20, marginRight:15}}/>
                    </View>
                    <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                  </View>
                ):(
                  <View/>
                )}
                {salt_score=='good'?(
                  <View>
                    <View style={{ width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'row'}}>
                      <Image style={styles.nutrientIcon} source={require('../../assets/images/salt_icon.png')}/>
                      <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:15}}>Salt: {salt} g</Text>
                      <View style={{flex:1}}/>
                      <View style={{height:15, width:15, borderRadius:15, backgroundColor:salt_color, marginTop:20, marginRight:15}}/>
                    </View>
                    <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                  </View>
                ):(
                  <View/>
                )}
                {sugar_score=='good'?(
                  <View>
                    <View style={{ width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'row'}}>
                      <Image style={styles.nutrientIcon} source={require('../../assets/images/sugar_icon.png')}/>
                      <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:15}}>Sugar: {sugar} g</Text>
                      <View style={{flex:1}}/>
                      <View style={{height:15, width:15, borderRadius:15, backgroundColor:sugar_color, marginTop:20, marginRight:15}}/>
                    </View>
                    <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                  </View>
                ):(
                  <View/>
                )}
                {fat_score=='good'?(
                  <View>
                    <View style={{ width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'row'}}>
                      <Image style={styles.nutrientIcon} source={require('../../assets/images/fat_icon.png')}/>
                      <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:15}}>Fat: {fat} g</Text>
                      <View style={{flex:1}}/>
                      <View style={{height:15, width:15, borderRadius:15, backgroundColor:fat_color, marginTop:20, marginRight:15}}/>
                    </View>
                    <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                  </View>
                ):(
                  <View/>
                )}
                {proteins_score=='good'?(
                  <View>
                    <View style={{ width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'row'}}>
                      <Image style={styles.nutrientIcon} source={require('../../assets/images/protein_icon.png')}/>
                      <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:15}}>Proteins: {proteins} g</Text>
                      <View style={{flex:1}}/>
                      <View style={{height:15, width:15, borderRadius:15, backgroundColor:proteins_color, marginTop:20, marginRight:15}}/>
                    </View>
                    <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                  </View>
                ):(
                  <View/>
                )}
                {fiber_score=='good'?(
                  <View>
                    <View style={{ width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'row'}}>
                      <Image style={styles.nutrientIcon} source={require('../../assets/images/fiber_icon.png')}/>
                      <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:15}}>Fiber: {fiber} g</Text>
                      <View style={{flex:1}}/>
                      <View style={{height:15, width:15, borderRadius:15, backgroundColor:fiber_color, marginTop:20, marginRight:15}}/>
                    </View>
                    <View style={{height:0.5, width:width*0.9, alignSelf:'center', backgroundColor:'#F0F0F0'}}/>
                  </View>
                ):(
                  <View/>
                )}
                {fruits_score=='good'?(
                  <View>
                    <View style={{ width:width*0.9, backgroundColor:'white', alignSelf:'center', flexDirection:'row'}}>
                      <Image style={styles.nutrientIcon} source={require('../../assets/images/fruit_icon.png')}/>
                      <Text style={{fontSize:18, fontFamily:'RobotoLight', marginLeft:10, marginTop:15}}>Fruits: {fruits} %</Text>
                      <View style={{flex:1}}/>
                      <View style={{height:15, width:15, borderRadius:15, backgroundColor:fruits_color, marginTop:20, marginRight:15}}/>
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
            <View style={{height:120}}>
            </View>

          </View>
        </ScrollView>
        <Button style={styles.scanButton}
          full
          rounded
          success
          onPress={() => {navigate('Scan')}}
        >
          <MaterialCommunityIcons style={{}} name="barcode-scan" size={30} color="white" />
          <Text style={[styles.textField,styles.scanButtonText]}>{I18n.t('scan')}</Text>
        </Button>
        <View style={{position:'absolute', bottom:0}} >
          <Tabbar navigation={this.props.navigation}>
          </Tabbar>
        </View>
      </View>
    );
  }
}


I18n.fallbacks = true

I18n.translations = {
  en: {
    scan: 'Scan'
  },
  es: {
    greeting: 'Escanea'
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
