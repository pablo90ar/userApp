import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import MainStackScreen from './main/MainStackScreen'
import AuthStackScreen from './auth/AuthStackScreen'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from './layouts/Spinner'

const RootStack = createStackNavigator()

const RootStackScreen = ({ auth: { isAuthenticated, loading } }) => {
  return loading ? (
    <Spinner />
  ) : (
    <RootStack.Navigator headerMode='none'>
      {isAuthenticated ? (
        <RootStack.Screen name='Main' component={MainStackScreen} options={{ animationEnabled: false }} />
      ) : (
        <RootStack.Screen name='Auth' component={AuthStackScreen} options={{ animationEnabled: false }} />
      )}
    </RootStack.Navigator>
  )
}

RootStackScreen.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(RootStackScreen)

const styles = StyleSheet.create({})
