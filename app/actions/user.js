import { SET_USER, SET_PROFILES } from './types'

export const setUser = user => ({
  type: SET_USER,
  payload: user,
})

export const setProfiles = profiles => ({
  type: SET_PROFILES,
  payload: profiles,
})
