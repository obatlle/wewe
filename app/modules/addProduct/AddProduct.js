import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback ,ScrollView } from 'react-native';

import { Container, Form, Input, Item, Button, Label } from 'native-base';

import * as firebase from 'firebase';

import styles from "./styles";

import { Analytics, ScreenHit, Event } from 'expo-analytics';

import { MaterialCommunityIcons } from '@expo/vector-icons';


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions';


var {height, width} = Dimensions.get('window');

const Tabbar = require('../Tabbar/tabbar');


class AddProduct extends React.Component {

  componentDidMount(){
    const analytics = new Analytics('UA-126042363-1');
    analytics.hit(new ScreenHit('AddProduct'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));
    this.readUserData()
  }

  constructor(props) {
    super(props);
    this.state = {
      product_name: null,
      product_brand:null,
      calories_value: null,
      sugar_value:null,
      salt_value:null,
      fat_value:null,
      fiber_value:null,
      protein_value:null,
      additive_value:null,
      fruit_value:null,

    };

  }

  addProduct = () => {
    const { navigate } = this.props.navigation;

    let created_at = Math.floor(Date.now() / 1000);

    let code= this.props.barcode
    let product_name=this.state.product_name
    let product_brand=this.state.product_brand
    let calories_value=this.state.calories_value
    let sugar_value=this.state.sugar_value
    let salt_value=this.state.salt_value
    let fat_value=this.state.fat_value
    let fiber_value=this.state.fiber_value
    let protein_value=this.state.protein_value
    let additive_value=this.state.additive_value
    let fruit_value=this.state.fruit_value

    firebase.database().ref('Products/'+code+'/').set({
        product_name,
        product_brand,
        code,
        calories_value,
        sugar_value,
        salt_value,
        fat_value,
        fiber_value,
        protein_value,
        additive_value,
        fruit_value,
        created_at
    }).then((data)=>{
        //success callback
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })

    console.log('Product added')
  }



  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={{flex:1}}>
          <ScrollView style={{marginTop:10}}>
            <Item floatingLabel>
              <Label style={{}}>Product Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(product_name) => this.setState({ product_name })}
              />
            </Item>
            <Item floatingLabel>
              <Label style={{}}>Product Brand</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(product_brand) => this.setState({ product_brand })}
              />
            </Item>
            <Item floatingLabel>
              <Label style={{}}>Calories (kCal)</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(calories_value) => this.setState({ calories_value })}
              />
            </Item>
            <Item floatingLabel>
              <Label style={{}}>Sugar (g)</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(sugar_value) => this.setState({ sugar_value })}
              />
            </Item>
            <Item floatingLabel>
              <Label style={{}}>Salt (g)</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(salt_value) => this.setState({ salt_value })}
              />
            </Item>
            <Item floatingLabel>
              <Label style={{}}>Saturated fat (g)</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(fat_value) => this.setState({ fat_value })}
              />
            </Item>
            <Item floatingLabel>
              <Label style={{}}>Fiber (g)</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(fiber_value) => this.setState({ fiber_value })}
              />
            </Item>
            <Item floatingLabel>
              <Label style={{}}>Proteins (g)</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(protein_value) => this.setState({ protein_value })}
              />
            </Item>
            <Item floatingLabel>
              <Label style={{}}>Fruit (%)</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(fruit_value) => this.setState({ fruit_value })}
              />
            </Item>
            <Item floatingLabel>
              <Label style={{}}>Additive amount</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(additive_value) => this.setState({ additive_value })}
              />
            </Item>
            <View style={{marginTop:30}}
            </View>
            <Button style={{ marginTop: 10 }}
              full
              rounded
              success
              onPress={() => this.addProduct()}
            >
              <Text style={[styles.textField,{color:'white'}]}>Add Product</Text>
            </Button>
          </ScrollView>
        </View>
        <View style={{position:'absolute', bottom:0}} >
          <Tabbar navigation={this.props.navigation}>
          </Tabbar>
        </View>
      </View>

    );
  }
}


function mapDispatchToProps (dispatch) {
  return bindActionCreators (ActionCreators, dispatch);
}

function mapStateToProps (state) {
  return {
    barcode: state.getBarcode,
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (AddProduct);
