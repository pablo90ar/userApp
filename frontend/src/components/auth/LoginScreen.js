import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { login } from '../../redux/actions/auth'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const LoginScreen = ({ login, navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const onPressLogin = () => {
    login(email, password)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        name='email'
        value={email}
        onChangeText={(value) => {
          onChange('email', value)
        }}
        placeholder='Email'
        returnKeyType='next'
        autoCapitalize='none'
        keyboardType='email-address'
        required
      />
      <TextInput
        name='password'
        value={password}
        onChangeText={(value) => {
          onChange('password', value)
        }}
        placeholder='Contraseña'
        returnKeyType='done'
        autoCapitalize='none'
        secureTextEntry={true}
        required
      />
      <Button title='login' onPress={() => onPressLogin()} />
      <Text>Aún no tenés una cuenta?</Text>
      <Button
        title='registrarme'
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  )
}

LoginScreen.propTypes = {
  login: PropTypes.func.isRequired,
}

export default connect(null, { login })(LoginScreen)

const styles = StyleSheet.create({})
