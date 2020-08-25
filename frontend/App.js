import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import RootStackScreen from './src/components/RootStackScreen'
import store from './src/redux/store'
import { Provider } from 'react-redux'
import axiosCfg from './src/helpers/axiosCfg'
import startUpAuth from './src/helpers/startUpAuth'

const App = () => {
  useEffect(() => {
    startUpAuth()
    axiosCfg()
  }, [])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </Provider>
  )
}

export default App
