import {
  USER_REGISTER_FETCH,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_AUTH_FETCH,
  USER_AUTH_SUCCESS,
  USER_AUTH_FAIL,
  USER_LOGIN_FETCH,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_DELETED,
  USER_SET_TOKEN,
} from '../actions/types'
import updateAxiosToken from '../../helpers/updateAxiosToken'
import updateLocalToken from '../../helpers/updateLocalToken'

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: true,
  user: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case USER_SET_TOKEN:
      return {
        ...state,
        token: payload,
      }
    case USER_LOGIN_FETCH:
    case USER_REGISTER_FETCH:
    case USER_AUTH_FETCH:
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
      }
    case USER_AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      }
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
      }
    case USER_LOGIN_SUCCESS:
      updateLocalToken(payload.token)
      updateAxiosToken(payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      }
    case USER_REGISTER_FAIL:
    case USER_AUTH_FAIL:
    case USER_LOGIN_FAIL:
    case USER_LOGOUT:
    case USER_DELETED:
      updateLocalToken(null)
      updateAxiosToken(null)
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      }
    default:
      return state
  }
}
