import React, {Component} from 'react';
import ReactNative from 'react-native';
import styles from "./styles";

const { View, TouchableHighlight, Text } = ReactNative;

class ListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View>
          <Text>{this.props.item}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = ListItem;
