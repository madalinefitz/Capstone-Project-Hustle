import React, {useContext, useState} from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View, ActivityIndicator, StyleSheet} from 'react-native'

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
    
    if (userToken !== null){
        if (accountModal){ 
            return(
                <MyAccount handleModalState={handleModalState} />
            )
        }
    }
    

    return(
        <NavigationContainer >
            {userToken !== null ? (
                <Stack.Navigator screenOptions={{
                    headerStyle: {
                        backgroundColor: '#EEF0F2',
                    },
                    headerTintColor: '#394053',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerRight: () => (
                        <Avatar
                        onPress={() => setAccountModal(true)}
                        title={userInfo.first_name.charAt(0)}
                        color="white"
                        size={35}
                        rounded
                        containerStyle={{ backgroundColor: "#1C2541" }}
                        />
                        ),
                    }}
                >
                    <Stack.Screen name='Home' component={Home} options={{title: '',}}/> 
                    <Stack.Screen name='Job Categories' component={JobCategories} options={{title: ''}}/>
                    <Stack.Screen name='My Shifts' component={MyShifts} options={{title: ''}}/>
                    <Stack.Screen name='Calendar Container' component={CalendarContainer}        
                        options={{title: '',}}
                    />
                    <Stack.Screen name='Estimated Pay' component={EstimatedPay} options={{title: '',}}/>
                </Stack.Navigator>
                
            ):(
                <Stack.Navigator 
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#EEF0F2',
                        },
                        headerTintColor: '#1C2541',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                            fontSize: 25,
                            
                        },
                        autoCapitalize: 'none'
                    }}
                >
                    <Stack.Screen name='Login' component={Login} options={{title: ''}}/>
                    <Stack.Screen name='Create Account' component={CreateAccount} options={{title: 'Hustle.',}}/> 
                </Stack.Navigator>
            )}
            
        </NavigationContainer>
    )
}

styles = StyleSheet.create({

    // Home
    welcomeUser: {
        fontSize: 24,
        alignSelf: 'center',
        padding: 0,
        fontWeight: 'bold',
        color: '#1C2541', 
        marginTop:0,
        marginBottom: 10,
        marginHorizontal: 20,
        
    },
    date: {
        fontSize:18,
        alignSelf: 'center',
        marginBottom: 35,
        color: '#1C2541', 
    },

    homeButtons: {
        marginTop: 0,
        backgroundColor: "#858AE3",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 2,
        alignSelf: 'stretch',
        marginVertical: 30,
        marginHorizontal: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    homeButtonsText: {
        fontSize: 25,
        color: '#EEF0F2',
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        paddingVertical: 20,
    },

    //MyAccount
    input: {
        height: 35,
        marginTop: 15,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#C3C9E9',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        zIndex: -1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 2, 
    },
    editButton:{
        alignSelf: 'flex-start',
        marginVertical: 20,
        marginHorizontal: 20,
        position: 'absolute',
    },
    editText:{
        color: '#C3C9E9',
        fontSize: 15,
    },

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
        alignSelf: 'flex-end',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 10,
        position: 'absolute',
    }, 
    buttonText: {
        color: '#C3C9E9',
        fontSize: 15,
        fontWeight: 'bold',
    },

    modalName: {
      textAlign: 'center',
      color: '#1C2541',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 25,
      marginTop: 25,
    },

    modalEmail: {
        textAlign: 'center',
        color: '#1C2541',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 20,
    },
    
    logoutButton: {
        backgroundColor: '#1C2541',
        alignSelf: 'center',
        marginTop:30,
        padding: 12,
        marginBottom:3,
        borderRadius: 20,
        width: 200,
    },

    logoutButtonText:{
        color: '#EEF0F2',
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'center',
    }, 
    
    deleteUserButton:{
        backgroundColor: '#C3C9E9',
        alignSelf: 'center',
        marginTop:40,
        padding: 10,
        marginBottom:3,
        borderRadius: 20,
    },

    deleteUserText:{
        color: '#EEF0F2',
        fontWeight: 'bold',
        fontSize: 18
    },

    // Calendar
    calendar: {
        borderWidth: 0,
        borderColor: '#CDD1DE',
        height: '50%',
        width: '100%',
        content: 'fill',
        marginBottom: 20,
        marginTop: 50,
    },
    addShiftButtonContainer: {
        backgroundColor: "#858AE3",
        borderRadius: 10,
        padding: 12,
        alignSelf: 'center',
        marginHorizontal: 20,
        marginTop: 80,
        zIndex: -2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    addShiftButtonText: {
        fontSize: 22,
        color: "#EEF0F2",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    shiftInput:{
        height: 30,
        margin: 5,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#C3C9E9',
        paddingHorizontal: 10,
        paddingVertical: 2,
        backgroundColor: 'white',
        zIndex: -1,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 2,
        color: '#1C2541', 
    },
    modalText:{
        color: '#1C2541', 
    },
    addDateButton:{
        alignSelf:'flex-start',
        position: 'relative',
        padding: 2,
    },
    addDateText:{
        color: '#C3C9E9',
        fontSize: 20,
        fontWeight: 'bold',
    },
    dropdown: {
        position: 'relative',
        color: 'red',
        height: 30,
        margin: 5,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#C3C9E9',
        paddingVertical: 2,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 2,
    },
    dropdownOptions: {
        position: 'relative',
        zIndex: 50,
        padding: 5,
        height: 30,
        alignSelf: 'stretch',
    },
    dropdownContainer:{
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: '#C3C9E9',
        alignSelf: 'stretch',
    },  
    saveShiftButtonContainer: {
        marginTop: 20,
        backgroundColor: "#C3C9E9",
        borderRadius: 10,
        padding: 15,
        alignSelf: 'center',
        margin: 10,
        zIndex: -2,
    },
    saveShiftButtonText: {
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    addShiftExitButton:{
        marginTop: 0,
        padding: 2,
        alignSelf: 'flex-end',
        marginBottom: 10,

    },
    addShiftExitButtonText:{
        color: '#C3C9E9',
        fontSize: 20,
    },
    

    // My Shifts
    shiftsContainer: {
        flex: 1,
        marginTop: 0,
    },
    shiftsButton:{
        alignSelf: 'flex-end',
        backgroundColor: "#1C2541",
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 15,
    },
    shiftsButtonText:{
        fontSize: 18,
        color: '#EEF0F2',
        fontWeight: 'bold',
    },
    shiftItem: {
        backgroundColor: '#C3C9E9',
        marginTop: 0,
        marginBottom: 8,
        marginHorizontal: 16,
        borderRadius: 15,
        alignItems: 'stretch',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    shiftTitle: {
        fontSize: 25,
        color: '#1C2541',
        fontWeight: 'bold',
        margin: 10,
    },
    shiftText: {
        fontSize: 18,
        color: '#1C2541',
        margin: 8,
    },
    shiftDeleteText:{  
        fontSize: 15,
        color: '#EEF0F2',
        fontWeight: 'bold',
    },
    shiftDeleteButton:{
        alignSelf: 'flex-end',
        backgroundColor: "#1C2541",
        borderRadius: 10,
        padding: 10,
        marginBottom: 0
    }, 
    shiftEditText:{  
        fontSize: 15,
        color: '#1C2541',
        fontWeight: 'bold',
    },
    shiftEditButton:{
        alignSelf: 'flex-end',
        marginTop: 10,
        padding: 5,
    }, 
    shiftSaveText:{  
        fontSize: 25,
        color: '#EEF0F2',
        fontWeight: 'bold',
    },
    shiftSaveButton:{
        backgroundColor: '#858AE3',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        marginTop:20,

    }, 
    editShiftInput: {
        backgroundColor: '#EEF0F2',
        height: 30,
        margin: 7,
        borderWidth: 2,
        borderColor: '#EEF0F2',
        paddingHorizontal: 10,
        alignSelf: 'stretch', 
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 2,
    },
    
    // Estimated Pay
    haul:{
        fontSize: 25, 
        color: '#1C2541',
        alignSelf: 'center',
        marginTop: 95,
        marginBottom: 15,
        fontWeight: 'bold',

    },
    payContainer: {
        backgroundColor: '#858AE3',
        marginBottom: 100,
        marginHorizontal: 16,
        alignSelf: 'center',
        borderRadius: 10,
        alignItems: 'center',
        padding: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    pay: {
      fontSize: 100,
      color: '#EEF0F2',
      alignSelf: 'center',
    },

    // Job Categories
    myCategoriesButton:{
        alignSelf: 'center',
        backgroundColor: "#1C2541",
        borderRadius: 10,
        padding: 10,
        marginVertical: 20,
        marginHorizontal: 10,
        width: '70%'
    },
    myCategoriesButtonText:{
        color: '#EEF0F2',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    categoryContainer: {
        flex: 1,
        marginTop: 0,
    },
    categoryItem: {
        backgroundColor: '#C3C9E9',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    categoryTitle: {
        fontSize: 20,
        color: '#1C2541',
        alignSelf: 'flex-start',
        fontWeight: 'bold',
    },
    categorySearch:{
        height: 40,
        width: '60%',
        margin: 20,
        borderWidth: 1,
        padding: 10,
        borderColor: '#C3C9E9',
        backgroundColor: '#EEF0F2',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 2,
        borderRadius: 10,
        alignSelf: 'center',
    },
    favoriteButton:{
        alignSelf: 'flex-end',
        fontSize: 25,
        position: 'absolute',
        padding: 15,
    },
})

export default AppNav