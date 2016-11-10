import { INIT_AUTH, SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from './action-types'

export const initialState = {
  authenticated: false,
  id: null
}

export function authReducer(state = initialState, action) {
  const { meta, payload } = action

  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        authenticated: true,
        id: payload.uid,
        photoURL: payload.photoURL
      }
    case SIGN_OUT_SUCCESS:
      return {
        authenticated: false,
        id: null
      }
    default:
      return state
  }
}
