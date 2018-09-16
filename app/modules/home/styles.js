import { StyleSheet } from 'react-native';

import * as theme from '../../styles/theme';
const  { color, padding, windowWidth, normalize, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.white,
      justifyContent: 'center',
      padding: 10
    },
    textField :{
      fontFamily: fontFamily.regular
    },


});


export default styles;
