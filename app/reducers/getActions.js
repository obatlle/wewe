import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const getProductInfo = createReducer('',{
  [types.GET_PRODUCT_INFO](state, action){
    console.log('reducer state:'+action.productInfo)
    return action.productInfo;
  }
});
