import React from 'react';
import { StyleSheet, Text, View , Alert} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

import { Button } from 'native-base';

import styles from "./styles";

import { Analytics, ScreenHit, Event } from 'expo-analytics';

import { Ionicons } from '@expo/vector-icons';


export default class Scan extends React.Component {

  componentDidMount(){
    const analytics = new Analytics('UA-126042363-1');
    analytics.hit(new ScreenHit('Scan'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));

  }

  state = {
    hasCameraPermission: null
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = data => {
    Alert.alert(
      'Scan successful!',
      JSON.stringify(data)
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ?
          <Text>Requesting for camera permission</Text> :
          this.state.hasCameraPermission === false ?
            <Text>Camera permission is not granted</Text> :
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={{ height: 300, width: 300 }}
            />
        }
      </View>
    );
  }
}
