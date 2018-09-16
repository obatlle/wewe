
import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity} from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import * as reducers from './app/reducers';
import RootStackNavigator from './app/modules/RootStackNavigator';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);



export default class Index extends Component {


  componentDidMount(){
  }
  render() {
    return (
      <View
       style={{flex:1}}>
      <Provider store={store}>
        <RootStackNavigator/>
      </Provider>
      </View>);
  }
}
