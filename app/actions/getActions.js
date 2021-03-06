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

export function getUserUID(userUID){
  return {
    type: types.GET_USER_UID,
    userUID,
  }
}

export function getUserName(userName){
  return {
    type: types.GET_USER_NAME,
    userName,
  }
}

export function getBarcode(barcode){
  return {
    type: types.GET_BARCODE,
    barcode,
  }
}

export function getFilterColor(filterColor){
  return {
    type: types.GET_FILTER_COLOR,
    filterColor,
  }
}
