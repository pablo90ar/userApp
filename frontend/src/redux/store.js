import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension' //complemento para observar estado del store en el explorador
import thunk from 'redux-thunk' //Middleware para acciones asincronas
import rootReducer from './reducers/index' //Reducer general que combina todos los sub-reducers
import updateLocalToken from '../helpers/updateLocalToken'

const initialState = {}

const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

// prevent auth error on first run of subscription
let currentState = { auth: { token: null } }

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState
  currentState = store.getState()
  // if the token changes set the value in AsyncStorage and axios headers
  if (previousState.auth.token !== currentState.auth.token) {
    //console.log('Cambio de token en store')
    //console.log('Token anterior:', previousState.auth.token)
    //console.log('Token actual:', currentState.auth.token)
    //const token = currentState.auth.token
    //updateLocalToken(token)
  }
})

export default store
