import createReducer from '../lib/createReducer'
import * as types from '../actions/types'


export const getScreen = createReducer('',{
  [types.GET_SCREEN](state, action){
    console.log('reducer state:'+action.screen)
    return action.screen;
  }
});
