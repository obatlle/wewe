
import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity} from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { Font, AppLoading } from 'expo';


import * as reducers from './app/reducers';
import AppContainer from './AppContainer';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

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
