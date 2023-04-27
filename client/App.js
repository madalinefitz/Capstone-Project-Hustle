/**
 * @format
 */
import React, {useContext} from 'react'
import {View, Text, ActivityIndicator} from 'react-native'

import {AuthProvider} from './components/AuthContext'
import AppNav from './components/AppNav';

function App() {

  return(
    <AuthProvider>
      <AppNav/>
    </AuthProvider>
  )
}

export default App
