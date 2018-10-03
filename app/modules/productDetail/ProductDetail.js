import React from 'react';
import { StyleSheet, Text, View , Alert, Dimensions, Image} from 'react-native';

import styles from "./styles";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions';

import { Analytics, ScreenHit, Event } from 'expo-analytics';


var {height, width} = Dimensions.get('window');


class ProductDetail extends React.Component {

  componentDidMount(){
    const analytics = new Analytics('UA-126042363-1');
    analytics.hit(new ScreenHit('ProductDetail'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));

  }

  constructor(props) {
    super(props);
    this.state = {
      productInfo: JSON.stringify(this.props.productInfo),
    };
    console.log('YYYYYYYYYYYYYYYYY'+ JSON.parse(this.state.productInfo).data.code)
  }


  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.stretch}
          source={{uri: JSON.parse(this.state.productInfo).data.product.image_front_url}}
        />
        <Text>{JSON.parse(this.state.productInfo).data.product.product_name}</Text>
      </View>
    );
  }
}



function mapDispatchToProps (dispatch) {
  return bindActionCreators (ActionCreators, dispatch);
}

function mapStateToProps (state) {
  return {
        productInfo: state.getProductInfo,
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (ProductDetail);
