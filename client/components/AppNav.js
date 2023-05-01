import React, {useContext, useState} from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View, Text, ActivityIndicator, Button, Modal, Pressable, SafeAreaView, StyleSheet} from 'react-native'

import AuthStack from './AuthStack'
import AppStack from './AppStack'
import {AuthContext} from './AuthContext'
import { Avatar } from '@rneui/themed'

import JobCategories from './JobCategories';
import Home from './Home'
import Login from './Login'
import CreateAccount from './CreateAccount';
import MyShifts from './MyShifts';
import CalendarContainer from './CalendarContainer';
import EstimatedPay from './EstimatedPay';
import MyAccount from './MyAccount';



const Stack = createNativeStackNavigator();

function AppNav(){
    const {isLoading, userToken, userInfo} = useContext(AuthContext)
    const [accountModal, setAccountModal] = useState(false);
    

    if (isLoading) {
        return(
            <View style = {{flex:1,justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }

    const handleModalState =()=>{
        setAccountModal(!accountModal)
    }

    if (accountModal){ 
        return(
            <MyAccount handleModalState={handleModalState}/>
        )
    }

    return(
        <NavigationContainer>
            {userToken !== null ? (
                <Stack.Navigator screenOptions={{
                    headerStyle: {
                        backgroundColor: 'blue',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerRight: () => (
                        <Avatar
                        onPress={() => setAccountModal(true)}
                        title={userInfo.first_name}
                        color="white"
                        size={32}
                        rounded
                        containerStyle={{ backgroundColor: "grey" }}
                        />)
                }}>
                    <Stack.Screen name='Home' component={Home}/> 
                    <Stack.Screen name='Job Categories' component={JobCategories}/>
                    <Stack.Screen name='My Shifts' component={MyShifts}/>
                    <Stack.Screen name='Calendar Container' component={CalendarContainer}        
                        options={{title: '',}}
                    />
                    <Stack.Screen name='Estimated Pay' component={EstimatedPay}/>
                </Stack.Navigator>
            ):(
                <Stack.Navigator 
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: 'blue',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                >
                    <Stack.Screen name='Login' component={Login}/>
                    <Stack.Screen name='Create Account' component={CreateAccount}/> 
                </Stack.Navigator>
            )}
            
        </NavigationContainer>
    )
}

export default AppNav