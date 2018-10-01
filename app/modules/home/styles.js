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
      backgroundColor: color.backgroundFeed,
      padding:10,
      paddingBottom:0,
      paddingTop:5,
      marginTop:0

    },
    categoryText:{
      flex:1,
      fontFamily:'RobotoBold',
      color: color.textDarkGrey
    },
    newCategoryText:{
      flex:1,
      fontFamily:'RobotoBold',
      color: color.textHighlightedRed,
    },
    navbarRightIcon:{
      flex:1,
      height:50,
      alignItems:'center'
    },
    navbarLeftIcon:{
      flex:1,
      height:50,
      alignItems:'center'
    },
    searchbarContainer:{
      flex:4,
      height:35,
      backgroundColor: color.greyLight,
      borderRadius:30,
      alignSelf:'center',
      flexDirection:'row'
    },
    searchbarSearchIcon:{
      marginTop:8,
      marginLeft:18
    },
    searchbarTextInput:{
      height: 30,
      flex:1,
      color: color.textDarkGrey,
      alignSelf:'center',
      marginLeft:10
    },
    searchbarPlaceholderTextColor:{
      color: color.textDarkGrey, 
    }


});


export default styles;
