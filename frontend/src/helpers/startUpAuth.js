import findStoredToken from './findStoredToken'
import { loadUser, updateStateToken, logout } from '../redux/actions/auth'
import store from '../redux/store'
import updateAxiosToken from './updateAxiosToken'

const startUpAuth = async () => {
  let token = await findStoredToken()
  store.dispatch(updateStateToken(token))
  updateAxiosToken(token)
  if (token !== null) {
    console.log('Autorizando token contra servidor')
    store.dispatch(loadUser())
  } else {
    console.log('No existe token de sesion previa')
    store.dispatch(logout())
  }
}

export default startUpAuth
