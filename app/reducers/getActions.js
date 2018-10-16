import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const getProductInfo = createReducer('',{
  [types.GET_PRODUCT_INFO](state, action){
    //console.log('reducer state:')
    return action.productInfo;
  }
});

export const getUserUID = createReducer('',{
  [types.GET_USER_UID](state, action){
    console.log('reducer state:')
    return action.userUID;
  }
});

export const getUserName = createReducer('',{
  [types.GET_USER_NAME](state, action){
    console.log('reducer state:')
    return action.userName;
  }
});

export const getBarcode = createReducer('',{
  [types.GET_BARCODE](state, action){
    console.log('reducer state:')
    return action.barcode;
  }
});

export const getFilterColor = createReducer('',{
  [types.GET_FILTER_COLOR](state, action){
    console.log('reducer state:')
    return action.filterColor;
  }
});
