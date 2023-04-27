import React, {useContext} from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View, Text, ActivityIndicator} from 'react-native'

import AuthStack from './AuthStack'
import AppStack from './AppStack'
import {AuthProvider, AuthContext} from './AuthContext'


function AppNav({navigation}){
    const {isLoading, userToken} = useContext(AuthContext)

  if (isLoading) {
    <View style = {{flex:1,justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size={'large'}/>
    </View>
  }

  return(
      <NavigationContainer>
        {userToken !== null ? <AppStack/> : <AuthStack />}
      </NavigationContainer>
  )
}

export default AppNav