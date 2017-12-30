import { SET_USER, SET_PROFILES } from '../actions/types'

const initialState = {
  user: {},
  profiles: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      }

    case SET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
      }

    default:
      return state
  }
}
