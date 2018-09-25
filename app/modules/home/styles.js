import { StyleSheet } from 'react-native';

import * as theme from '../../styles/theme';
const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.white,
      justifyContent: 'center',

    },
    searchBar :{
      marginTop:0,
      height:50,
      flexDirection:'row'
    },
    categoryBar :{
      height:40,
      flexDirection:'row',
      alignItems:'center',
      paddingLeft:20,
      paddingRight:20
    },
    feedContainer :{
      flex:1,
      backgroundColor:'#F1F5F8',
      padding:10,
      paddingBottom:0,
      paddingTop:5,
      marginTop:0

    },
    categoryText:{
      flex:1,
      fontFamily:'RobotoBold',
      color:'#999999'
    },


});


export default styles;
