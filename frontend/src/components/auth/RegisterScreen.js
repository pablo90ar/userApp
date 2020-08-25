import React, { useState } from 'react'
import { StyleSheet, Button, TextInput, View, Text } from 'react-native'
import { register } from '../../redux/actions/auth'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const RegisterScreen = ({ register, navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const onChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const onPressRegister = () => {
    register(name, email, password)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        name='name'
        value={name}
        onChangeText={(value) => {
          onChange('name', value)
        }}
        placeholder='Nombre'
        returnKeyType='next'
        autoCapitalize='words'
        required
      />
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
        returnKeyType='next'
        autoCapitalize='none'
        secureTextEntry={true}
        required
      />
      <TextInput
        name='password2'
        value={password2}
        onChangeText={(value) => {
          onChange('password2', value)
        }}
        placeholder='Repetir contraseña'
        returnKeyType='done'
        autoCapitalize='none'
        secureTextEntry={true}
        required
      />
      <Button title='Registrarme' onPress={() => onPressRegister()} />
      <Text>Ya tenés una cuenta?</Text>
      <Button
        title='login'
        onPress={() => {
          navigation.navigate('Login')
        }}
      />
    </View>
  )
}

RegisterScreen.propTypes = {
  register: PropTypes.func.isRequired,
}

export default connect(null, { register })(RegisterScreen)

const styles = StyleSheet.create({})
