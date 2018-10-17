import React from 'react';
import { StyleSheet, Text, View, Image,Platform, TextInput, Dimensions  } from 'react-native';

import { Button } from 'native-base';

import * as firebase from 'firebase';

import styles from "./styles";

import { Analytics, ScreenHit, Event } from 'expo-analytics';

import Masonry from 'react-native-masonry';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { CollapsibleHeaderScrollView } from 'react-native-collapsible-header-views';

var {height, width} = Dimensions.get('window');

const Tabbar = require('../Tabbar/tabbar');


export default class Home extends React.Component {

  componentDidMount(){
    const analytics = new Analytics('UA-126042363-1');
    analytics.hit(new ScreenHit('Home'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));

  }

  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }




  logout = () => {
    const { navigate } = this.props.navigation;

    //Tracking event: logout
    const analytics = new Analytics('UA-126042363-1');
    analytics.event(new Event('logout', 'home'))
      .then(() => console.log("success"))
      .catch(e => console.log(e.message));

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      }, function(error) {
        console.log(error)
        // An error happened.
        //Tracking event: error
        const analytics = new Analytics('UA-126042363-1');
        analytics.event(new Event('error', 'signout',error))
          .then(() => console.log("success"))
          .catch(e => console.log(e.message));
      });

  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <CollapsibleHeaderScrollView
          CollapsibleHeaderComponent={
            <View>
              <View style={styles.searchBar}>
                <View style={styles.navbarLeftIcon}>
                  <Image
                    style={{marginTop:10, height:30, width:30}}
                    source={require('../../assets/images/icon.png')}
                  />
                </View>
                <View style={styles.searchbarContainer}>
                  <Ionicons style={styles.searchbarSearchIcon} name="ios-search" size={20} color="#9E9E9E" />
                  <TextInput
                    style={styles.searchbarTextInput}
                    clearButtonMode={'while-editing'}
                    clearTextOnFocus={true}
                    onChangeText={(search) => this.setState({search})}
                    placeholder={'Search on Wewe'}
                    placeholderTextColor={styles.searchbarPlaceholderTextColor}
                    value={this.state.search}
                  />
                </View>
                <View style={styles.navbarRightIcon}>
                  <Ionicons style={{marginTop:10}} name="md-funnel" size={27} color="black" />
                </View>
              </View>
              <View style={styles.categoryBar}>
                <Text style={styles.newCategoryText}>NEW!</Text>
                <Text style={styles.categoryText}>Food</Text>
                <Text style={styles.categoryText}>Phones</Text>
                <Text style={styles.categoryText}>Home</Text>
                <Text style={styles.categoryText}>Sports</Text>
                <Text style={styles.categoryText}>Fashion</Text>
              </View>
            </View>
          }
          headerHeight={115}
          statusBarHeight={Platform.OS === 'ios' ? 20 : 0}
        >
        <View>
          <View style={styles.feedContainer}>
            <Masonry
              imageContainerStyle={{borderRadius:5}}
              spacing={1.5}
              columns={2} // optional - Default: 2
              bricks={[
                {
                  uri: 'https://s-media-cache-ak0.pinimg.com/736x/b1/21/df/b121df29b41b771d6610dba71834e512.jpg',
                },
                {
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQpD8mz-2Wwix8hHbGgR-mCFQVFTF7TF7hU05BxwLVO1PS5j-rZA',
                },
                {
                  uri: 'https://s-media-cache-ak0.pinimg.com/736x/5a/15/0c/5a150cf9d5a825c8b5871eefbeda8d14.jpg'
                },
                {
                  uri: 'https://s-media-cache-ak0.pinimg.com/736x/04/63/3f/04633fcc08f9d405064391bd80cb0828.jpg'
                },
                {
                  uri: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQRWkuUMpLyu3QnFu5Xsi_7SpbabzRtSis-_QhKas6Oyj3neJoeug'
                },
                {
                  uri: 'https://s-media-cache-ak0.pinimg.com/736x/a5/c9/43/a5c943e02b1c43b5cf7d5a4b1efdcabb.jpg'
                },
                {
                  uri: 'https://i0.wp.com/www.youbodyhealth.com/wp-content/uploads/2016/08/Delicious-Foods-can-Harm-Your-Brain.jpg?'
                },
                {
                  uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2017-03/29/15/campaign_images/buzzfeed-prod-fastlane-03/26-delicious-korean-foods-you-need-in-your-life-2-30138-1490814365-13_dblbig.jpg',
                },
                {
                  uri: 'https://pbs.twimg.com/media/B59AOmICQAAiGGj.png',
                },
                {
                  uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2013-12/enhanced/webdr05/17/17/enhanced-buzz-orig-2548-1387320822-8.jpg'
                },
                {
                  uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2015-03/17/15/enhanced/webdr13/enhanced-6527-1426620797-18.jpg'
                },
                {
                  uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2014-12/1/15/enhanced/webdr02/enhanced-18393-1417466529-5.jpg'
                },
                {
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXXTmdaGSOFK8iBeYqoA6_XiQGGWvu6KGnqAxXYyvJA-JKin8ImQ'
                },
                {
                  uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2015-04/3/15/enhanced/webdr06/enhanced-24427-1428089292-2.jpg'
                },
                {
                  uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-12/28/12/asset/buzzfeed-prod-web-09/sub-buzz-24236-1482944714-1.jpg'
                },
                {
                  uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-03/7/17/enhanced/webdr08/enhanced-buzz-8155-1457391039-5.jpg'
                },
                {
                  uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2017-03/30/12/asset/buzzfeed-prod-fastlane-01/sub-buzz-24597-1490890739-1.jpg'
                },
                {
                  uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-01/14/20/campaign_images/webdr15/which-delicious-mexican-food-item-are-you-based-o-2-20324-1452822970-1_dblbig.jpg'
                },
                {
                  uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2015-11/30/10/enhanced/webdr15/enhanced-18265-1448896942-17.jpg'
                },
                {
                  uri: 'https://img.buzzfeed.com/buzzfeed-static/static/2015-12/30/16/enhanced/webdr04/enhanced-15965-1451509932-6.jpg'
                }
              ]}
            />
            </View>
            <Button style={{ marginTop: 10 }}
              full
              rounded
              success
              onPress={() => navigate('HistoricalList')}
            >
              <Text style={[styles.textField,{color:'white'}]}>Historical Product List</Text>
            </Button>

            <Button style={{ marginTop: 10 }}
              full
              rounded
              success
              onPress={() => this.logout()}
            >
              <Text style={[styles.textField,{color:'white'}]}>Logout</Text>
            </Button>
          </View>
        </CollapsibleHeaderScrollView>
        <Button style={{position:'absolute', bottom: 50, width:width*0.5, alignSelf:'center', flexDirection:'row'}}
          full
          rounded
          success
          onPress={() => navigate('Scan')}
        >
          <MaterialCommunityIcons style={{}} name="barcode-scan" size={30} color="white" />
          <Text style={[styles.textField,{color:'white', marginLeft:8}]}>Scan</Text>

        </Button>
        <Tabbar navigation={this.props.navigation}>
        </Tabbar>
      </View>

    );
  }
}
