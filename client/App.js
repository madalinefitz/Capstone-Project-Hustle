/**
 * @format
 */
import React from 'react'
import {Text, Pressable, View, StyleSheet} from 'react-native';

import {AuthProvider} from './components/AuthContext'
import {DateProvider} from './components/DateContext'
import AppNav from './components/AppNav';

function App() {

  return(
    <DateProvider>
    <AuthProvider >
        <AppNav/>
    </AuthProvider>
    </DateProvider>
  )
}



export default App
