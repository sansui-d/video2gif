import {SETGIFURL ,SETLOADING} from '../types/index'

const rootState = {
    gifUrl: '',
    loading: false
}
export default function reducers(state=rootState,actions) {
  switch(actions.type) {
    case SETGIFURL:
      return {...state, gifUrl: actions.gifUrl}
    case SETLOADING: 
    return {...state, loading: actions.loading}
    default:
      return state
  }
}