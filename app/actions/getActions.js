import * as types from './types'

import {
  AsyncStorage,
} from 'react-native'


export function getProductInfo(productInfo){
  return {
    type: types.GET_PRODUCT_INFO,
    productInfo,
  }
}
