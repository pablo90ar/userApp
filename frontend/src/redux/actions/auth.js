import axios from 'axios'
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
  USER_SET_TOKEN,
} from './types'

// Set State Token
export const updateStateToken = (token) => async (dispatch) => {
  if (token) {
    console.log('Seteando token en store')
  } else {
    console.log('Borrando token del store')
  }
  dispatch({
    type: USER_SET_TOKEN,
    payload: token,
  })
}

// Load User
export const loadUser = () => async (dispatch) => {
  dispatch({ type: USER_AUTH_FETCH })
  try {
    const res = await axios.get('/auth')
    console.log('Usuario autorizado')
    dispatch({
      type: USER_AUTH_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    console.log('Usuario no autorizado', err)
    /*  const errors = res.data.errors
    if (errors) {
      errors.forEach((error) => console.log(error.msg))
    } */
    dispatch({
      type: USER_AUTH_FAIL,
    })
  }
}

// Login User
export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_FETCH,
  })
  const body = JSON.stringify({ email, password })
  console.log('Obteniendo token de usuario:', body)
  try {
    const res = await axios.post('/auth', body)
    console.log('token:', res.data.token)
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    })
    dispatch(loadUser())
  } catch (res) {
    //console.log(err)
    const errors = res.data.errors
    if (errors) {
      errors.forEach((error) => console.log(error.msg))
    }
    dispatch({
      type: USER_LOGIN_FAIL,
    })
  }
}

// Register User
export const register = (name, email, password) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_FETCH,
  })
  const body = JSON.stringify({ name, email, password })
  console.log('Registrando usuario:', body)
  try {
    const res = await axios.post('/user', body)
    dispatch({
      type: USER_REGISTER_SUCCESS,
    })
    dispatch(login(email, password))
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: USER_REGISTER_FAIL,
    })
  }
}

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT })
}
