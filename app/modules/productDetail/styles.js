import { StyleSheet, Dimensions } from 'react-native';

import * as theme from '../../styles/theme';
const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: 'white',
  },
  cardContianer:{
    position:'absolute',
    top:160,
    width:width*0.98,
    height:height,
    alignItems:'center',
    alignSelf:'center',
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    backgroundColor:'black'
  },
  backgroundCardImage:{
    width:width*0.98,
    height:height,
    alignSelf:'center',
    overflow: 'hidden',
    borderRadius:15
  },
  productInfoContainer:{
    width:width*0.98,
    alignSelf:'center',
    flexDirection:'column'
  },
  generalProductInfo:{
    width:width*0.95,
    height:160,
    alignSelf:'center',
  },
  productImageContainer:{
    flexDirection:'row',
    marginTop:10,
    marginLeft:20
  },
  productImage:{
    width:100,
    resizeMode:'contain'
  },
  productNameContainer:{
    flexDirection:'column',
    marginLeft:20,
    width: width-140
  },
  productName:{
    fontSize:24,
    fontFamily:'RobotoBold'
  },
  productBrand:{
    fontSize:16,
    fontFamily:'RobotoLight',
    color:'#9E9E9E'
  },
  productScoreContainer:{
    flexDirection:'row',
    marginTop: 20,
    alignItems:'center'
  },
  productScore:{
    borderRadius:20,
    height:15,
    width:15,
    alignSelf:'center'
  },
  productScoreExcellent:{
    backgroundColor: color.scoreExcellent,
  },
  productScoreGood:{
    backgroundColor:color.scoreGood
  },
  productScoreMedium:{
    backgroundColor:color.scoreMedium
  },
  productScoreRegular:{
    backgroundColor:color.scoreRegular
  },
  productScoreBad:{
    backgroundColor:color.scoreBad
  },
  productScoreValue:{
    fontSize:18,
    fontFamily:'RobotoBold'
  },
  productScoreText:{
    fontSize:16,
    fontFamily:'RobotoLight',
    color:color.textDarkGrey
  },
  productCardContainer:{
    backgroundColor:color.backgroundCard,
    width:width*0.95,
    alignSelf:'center',
    borderRadius:10,
    marginTop:10
  },
  productCardTitle:{
    height:50,
    width:width*0.95,
    backgroundColor:color.greyLight,
    alignSelf:'center',
    flexDirection:'column',
    borderTopLeftRadius:10,
    borderTopRightRadius:10
  },
  productCardTitleText:{
    fontSize:18,
    fontFamily:'RobotoRegular',
    fontWeight:'200',
    marginLeft:10,
    marginTop:14
  },
  scanButton:{
    position:'absolute',
    bottom: 50,
    width:width*0.5,
    alignSelf:'center'
  },
  scanButtonText:{
    color:'white',
    marginLeft:8
  }





});


export default styles;
