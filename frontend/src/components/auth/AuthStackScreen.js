import React from 'react'
import { StyleSheet } from 'react-native'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import { createStackNavigator } from '@react-navigation/stack'

const AuthStack = createStackNavigator()

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name='Login' component={LoginScreen} options={{ title: 'Ingresar' }} />
      <AuthStack.Screen name='Register' component={RegisterScreen} options={{ title: 'Registro' }} />
    </AuthStack.Navigator>
  )
}

export default AuthStackScreen

const styles = StyleSheet.create({})
