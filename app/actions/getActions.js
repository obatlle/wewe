import * as types from './types'

import {
  AsyncStorage,
} from 'react-native'


export function getScreen(screen){
  return {
    type: types.GET_SCREEN,
    screen,
  }
}
