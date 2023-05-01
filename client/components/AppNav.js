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
    console.log(accountModal)
    



    if (isLoading) {
        return(
            <View style = {{flex:1,justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }

    if (accountModal){ 
        return(
        <SafeAreaView style={styles.centeredView}>
            <Modal>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setAccountModal(!accountModal)}>
                            <Text style={styles.buttonText}>X</Text>
                        </Pressable>
                        <Text style={styles.modalText}>
                            {userInfo.first_name}
                            <Text style={styles.modalText}> {userInfo.last_name}</Text>
                        </Text>
                        <Text style={styles.modalText}>{userInfo.email}</Text>
                        <Pressable style={styles.logoutButton} onPress={()=> {logout()}}>
                            <Text style={styles.logoutButtonText}>Logout</Text>
                        </Pressable>
                        
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
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

const styles = StyleSheet.create({
    centeredView: {
      width: '90%',
      height: '90%',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 10,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 30,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },

    buttonClose: {
        borderRadius: 20,
        padding: 5,
        elevation: 1,
        backgroundColor: '#2196F3',
        alignSelf: 'flex-end',
        marginBottom:20
    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12
    }, 


    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 20
    },

    logoutButton: {
        backgroundColor: '#2196F3',
        alignSelf: 'center',
        marginTop:10,
        padding: 7,
        marginBottom:3,
        borderRadius: 20,
    },

    logoutButtonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    }

  });

export default AppNav