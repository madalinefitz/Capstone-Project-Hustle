import React, {useContext} from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View, Text, ActivityIndicator} from 'react-native'

import AuthStack from './AuthStack'
import AppStack from './AppStack'
import {AuthContext} from './AuthContext'

import JobCategories from './JobCategories';
import Home from './Home'
import Login from './Login'

const Stack = createNativeStackNavigator();

function AppNav({navigation}){
    const {isLoading, userToken} = useContext(AuthContext)

  if (isLoading) {
    return(
    <View style = {{flex:1,justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size={'large'}/>
    </View>
    )
  }

  return(
    <NavigationContainer>
        <Stack.Navigator>
            {userToken !== null ? 
            (<>
            <Stack.Screen name='Home' component={Home}/> 
            <Stack.Screen name='Job Categories' component={JobCategories}/>
            </>): 
            <Stack.Screen name='Login' component={Login}/>}
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNav