import { Dimensions, Platform } from 'react-native';
import { moderateScale as normalize } from 'react-native-size-matters';

const color = {
    black: "#3B3031",
    light_black: "#414141",
    main: "rgb(99,139,250)",
    white: "#ffffff",
    light_grey: "#eaeaea",
    grey: "#ccc",
    red: "red",
    underlayColor: "#ddd",

    backgroundFeed: '#F1F5F8',
    textDarkGrey: '#9E9E9E',
    textHighlightedRed: '#FF3F56',
    greyLight: '#F0F0F0',
    scoreExcellent:'darkgreen',
    scoreGood:'green',
    scoreMedium:'yellow',
    scoreRegular:'orange',
    scoreBad:'red',
    backgroundCard: 'white'
}

const fontSize = {
    small: normalize(12),
    regular: normalize(14),
    large: normalize(21)
}

const fontFamily = {
    extrabold: "RobotoExtraBold",
    bold: "RobotoBold",
    medium: "RobotoMedium",
    regular: "RobotoRegular",
    light: "RobotoLight"
}

const padding = 8;
const navbarHeight = (Platform.OS === 'ios') ? 64 : 54;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const tabColor = (Platform.OS === "ios") ? "rgba(73,75,76, .5)" : "rgba(255,255,255,.8)";
const selectedTabColor = (Platform.OS === "ios") ? "rgb(73,75,76)" : "#fff";

const tabIconStyle = { size: 21, color: tabColor, selected: selectedTabColor }
const navTitleStyle = { fontSize: fontSize.regular , fontFamily: fontFamily.extrabold, color: color.black }

export {
    color,
    fontSize,
    fontFamily,
    padding,
    navbarHeight,
    windowWidth,
    windowHeight,
    tabIconStyle,
    navTitleStyle,
    normalize
}
