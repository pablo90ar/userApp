import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Search from './search/Search'
import Profile from './profile/Profile'
import Alert from './alert/Alert'

const MainStack = createMaterialBottomTabNavigator()

const MainStackScreen = () => {
  return (
    <MainStack.Navigator
      initialRouteName='Search'
      activeColor='#491e63'
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: 'tomato' }}
    >
      <MainStack.Screen
        name='Alert'
        component={Alert}
        options={{
          tabBarLabel: 'Alerts',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='bell' color={color} size={24} />
          ),
        }}
      />
      <MainStack.Screen
        name='Search'
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />
      <MainStack.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account' color={color} size={26} />
          ),
        }}
      />
    </MainStack.Navigator>
  )
}

export default MainStackScreen
