
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from './app/actions'

import {
  AsyncStorage,
  Alert,
  View,
  Text,
  TouchableHighlight,
  Stylesheet,
  Navigator,
} from 'react-native';

import RootStackNavigator from './app/modules/RootStackNavigator';


class AppContainer extends Component {

  componentWillMount(){

  }

  render () {
    return (
      <RootStackNavigator/>
    );
  }
}



function mapDispatchToProps (dispatch) {
  return bindActionCreators (ActionCreators, dispatch);
}

function mapStateToProps (state) {
  return {
    //demoState: state.demoState,
    //recipeCount: state.recipeCount,
    //highscore: state.highscore
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (AppContainer);
