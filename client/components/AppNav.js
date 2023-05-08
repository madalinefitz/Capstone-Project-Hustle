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
                        size={32}
                        rounded
                        containerStyle={{ backgroundColor: "#1C2541" }}
                        />
                        ),
                    }}
                >
                    <Stack.Screen name='Home' component={Home} options={{title: '',}}/> 
                    <Stack.Screen name='Job Categories' component={JobCategories}/>
                    <Stack.Screen name='My Shifts' component={MyShifts} />
                    <Stack.Screen name='Calendar Container' component={CalendarContainer}        
                        options={{title: '',}}
                    />
                    <Stack.Screen name='Estimated Pay' component={EstimatedPay}/>
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
                        },
                        autoCapitalize: 'none'
                    }}
                >
                    <Stack.Screen name='Login' component={Login} />
                    <Stack.Screen name='Create Account' component={CreateAccount}/> 
                </Stack.Navigator>
            )}
            
        </NavigationContainer>
    )
}

styles = StyleSheet.create({

    // Home
    welcomeUser: {
        fontSize: 30,
        alignSelf: 'flex-start',
        padding: 0,
        fontWeight: 'bold',
        color: '#1C2541', 
        marginTop:0,
        marginBottom: 40,
        marginHorizontal: 20,
        
    },
    // CDD1DE, 545677, 012A36, -C9B6BE, CEFF1A, C2E812

    homeButtons: {
        marginTop: 0,
        backgroundColor: "#B5CA8D",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 2,
        alignSelf: 'stretch',
        marginVertical: 30,
        marginHorizontal: 10,
    },
    homeButtonsText: {
        fontSize: 25,
        color: 'white',
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        paddingVertical: 20,
    },

    //MyAccount
    input: {
        height: 40,
        width: 200,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        alignSelf: 'center', 
    },
    editButton:{
        alignSelf: 'flex-start',
        marginTop:0,
        marginBottom:30,
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
        padding: 5,
        marginBottom:0,
        marginTop:0
    }, 
    buttonText: {
        color: '#C3C9E9',
        fontSize: 15,
        fontWeight: 'bold',
    },

    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color: '#1C2541',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 20
    },
    
    logoutButton: {
        backgroundColor: '#1C2541',
        alignSelf: 'center',
        marginTop:10,
        padding: 12,
        marginBottom:3,
        borderRadius: 20,
        width: 200,
    },

    logoutButtonText:{
        color: 'white',
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
        color: 'white',
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
        backgroundColor: "#C3C9E9",
        borderRadius: 10,
        padding: 10,
        alignSelf: 'center',
        marginHorizontal: 20,
        marginTop: 80,
        zIndex: -2,
    },
    addShiftButtonText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    shiftInput:{
        height: 30,
        margin: 2,
        alignSelf: 'center',
        width: '70%',
        borderWidth: 1,
        padding: 2,
        backgroundColor: 'white',
        zIndex: -1,
    },
    dropdown: {
        position: 'relative',
        backgroundColor: 'white',
        height: 30,
        margin: 2,
        alignSelf: 'center',
        width: '60%',
        borderWidth: 1,
        padding: 2,
        backgroundColor: 'white',
    },
    dropdownOptions: {
        position: 'relative',
        zIndex: 50,
        marginHorizontal: 5,
        height: 30,
        margin: 1,
        alignSelf: 'center',
        width: '60%',
        padding: 1,

    },
    dropdownContainer:{
        borderWidth: 1,
        backgroundColor: 'white',
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
        color: "#fff",
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
    shiftItem: {
        backgroundColor: '#B5CA8D',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 15,
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
    shiftTitle: {
        fontSize: 30,
        color: '#1C2541',
        fontWeight: 'bold',
        margin: 10,
    },
    shiftText: {
        fontSize: 20,
        color: '#1C2541',
        margin: 10,
    },
    shiftDeleteText:{  
        fontSize: 15,
        color: 'white',
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
        color: 'white',
        fontWeight: 'bold',
    },
    shiftSaveButton:{
        backgroundColor: '#C3C9E9',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,

    }, 
    
    // Estimated Pay
    payContainer: {
        backgroundColor: '#B5CA8D',
        marginVertical: 100,
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
      color: 'white',
      alignSelf: 'center',
    },

    // Job Categories
    myCategoriesButton:{
        alignSelf: 'flex-end',
        backgroundColor: "#B5CA8D",
        borderRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 2,
        marginVertical: 30,
        marginHorizontal: 10,
        width: '60%'
      },
      myCategoriesButtonText:{
        color: 'white',
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
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      categoryTitle: {
        fontSize: 25,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
      },
      categorySearch:{
        height: 40,
        margin: 20,
        borderWidth: 1,
        padding: 10,
      },
      favoriteButton:{
        alignSelf: 'flex-end',
        fontSize: 20,
        margin: 0,
        position: 'relative',
      },
})

export default AppNav