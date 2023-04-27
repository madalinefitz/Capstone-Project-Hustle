/**
 * @format
 */
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from './components/AuthStack'
import AppStack from './components/AppStack'
import {AuthProvider} from './components/AuthContext'

function App() {
  return(
    <AuthProvider>
      <NavigationContainer>
        {/* <AppStack/> */}
        <AuthStack />
      </NavigationContainer>
    </AuthProvider>
  )
}

export default App
