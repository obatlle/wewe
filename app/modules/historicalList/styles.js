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
    bottom:0,
    width:width*0.98,
    height:height*0.9,
    alignSelf:'center',
    borderTopLeftRadius:15,
    borderTopRightRadius:15
  },
  backgroundCardImage:{
    bottom:0,
    width:width*0.98,
    height:height*0.9+30,
    backgroundColor:'black',
    alignSelf:'center',
    overflow: 'hidden',
    borderRadius:15
  },
  productInfoContainer:{
    position:'absolute',
    bottom:0,
    width:width*0.98,
    height:height*0.9,
    alignSelf:'center'
  },
  generalProductInfo:{
    backgroundColor:'white',
    width:width*0.95,
    height:200,
    alignSelf:'center',
    borderRadius:10
  },

});


export default styles;
