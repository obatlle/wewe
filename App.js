
import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity} from 'react-native';
import { createStore, applyMiddleware, combineReducers,compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {createLogger} from 'redux-logger';

import { Font, AppLoading } from 'expo';


import reducer from './app/reducers';
import AppContainer from './AppContainer';

const loggerMiddleware = createLogger({predicate:(getState, action) => __DEV__});

function configureStore (initialState) {
  const enhancer = compose(
    applyMiddleware (
      thunkMiddleware,
      loggerMiddleware,
      thunk,
      promise,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore ({});


function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
}


export default class Index extends Component {

  constructor() {
      super();
      this.state = {
          isReady: false,
      }
  }

  async _loadAssetsAsync() {
      const fontAssets = cacheFonts([
          {RobotoExtraBold: require('./app/assets/fonts/Roboto-Black.ttf')},
          {RobotoBold: require('./app/assets/fonts/Roboto-Bold.ttf')},
          {RobotoMedium: require('./app/assets/fonts/Roboto-Medium.ttf')},
          {RobotoRegular: require('./app/assets/fonts/Roboto-Regular.ttf')},
          {RobotoLight: require('./app/assets/fonts/Roboto-Light.ttf')}
      ]);

      await Promise.all([...fontAssets]);
  }

  render() {
    if (!this.state.isReady) {
        return (
            <AppLoading
                startAsync={this._loadAssetsAsync}
                onFinish={() => this.setState({isReady: true})}
                onError={console.warn}
            />
        );
    }

    return (
      <View
       style={{flex:1}}>
      <Provider store={store}>
        <AppContainer/>
      </Provider>
      </View>);
  }
}
