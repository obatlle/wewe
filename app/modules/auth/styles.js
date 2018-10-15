import { StyleSheet, Dimensions } from 'react-native';

import * as theme from '../../styles/theme';
const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf:'center',
      justifyContent: 'center',
      padding: 10,
      position:'absolute',
      top:0,
       width:width,
       marginTop:30
    },
    wrapper: {
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom:20,
      textAlign:'center'
    },


});


export default styles;
