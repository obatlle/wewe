
import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Auth from './auth/Auth';
import Home from './home/Home';
import Splash from './splash/Splash';
import Scan from './scan/Scan';
import ProductDetail from './productDetail/ProductDetail';
import HistoricalList from './historicalList/HistoricalList';
import Profile from './profile/Profile';

const MainStack = StackNavigator(
  {
    Auth: {
      screen: Auth,
    },
    Home: {
      screen: Home,
    },
    Splash: {
      screen: Splash,
    },
    Scan: {
      screen: Scan,
    },
    ProductDetail: {
      screen: ProductDetail,
    },
    HistoricalList: {
      screen: HistoricalList,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    initialRouteName: 'Splash',
    cardStyle: {
      backgroundColor: 'white',
    },
    navigationOptions: () => ({
      headerBackTitle: 'Back',
      headerPressColorAndroid: 'white',
      headerStyle: {
        backgroundColor: 'black',
        marginTop:-65
      },
      headerTintColor: 'white',
    }),
  }
);

export default StackNavigator(
  {
    Main: {
      screen: MainStack,
    },
  },
  {
    initialRouteName: 'Main',
    cardStyle: {
      backgroundColor: 'white',
    },
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
      },
    }),
    navigationOptions: {
      gesturesEnabled: false,
    }
  }
);
