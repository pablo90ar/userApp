import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { logout } from '../../../redux/actions/auth'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Profile = ({ logout }) => {
  const onPressLogout = () => {
    logout()
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
      <Button title='Salir' onPress={() => onPressLogout()} />
    </View>
  )
}

Profile.propTypes = {
  logout: PropTypes.func.isRequired,
}

export default connect(null, { logout })(Profile)

const styles = StyleSheet.create({})
