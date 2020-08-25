import React, { Fragment } from 'react'
import { View, Image } from 'react-native'
import spinner from './spinner.gif'

export default () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Image source={spinner} />
  </View>
)
