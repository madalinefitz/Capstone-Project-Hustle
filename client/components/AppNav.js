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
                        title={userInfo.first_name.charAt(0)}
                        color="white"
                        size={32}
                        rounded
                        containerStyle={{ backgroundColor: "grey" }}
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
                            backgroundColor: 'blue',
                        },
                        headerTintColor: '#fff',
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
        alignSelf: 'center',
        padding: 20,
        fontWeight: 'bold'
    },

    homeButtons: {
        marginTop: 0,
        backgroundColor: "blue",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 2,
        alignSelf: 'stretch',
        marginVertical: 30,
        marginHorizontal: 10
    },
    homeButtonsText: {
        fontSize: 25,
        color: "#fff",
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
    },
    editButton:{
        alignSelf: 'flex-start',
        marginTop:0,
        marginBottom:30,
    },
    editText:{
        color: '#2196F3',
        fontSize: 18,
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
        borderRadius: 20,
        padding: 5,
        backgroundColor: '#2196F3',
        alignSelf: 'flex-end',
        marginBottom:0,
        marginTop:0
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
        padding: 12,
        marginBottom:3,
        borderRadius: 20,
        width: 200,
    },

    logoutButtonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf: 'center',
    }, 
    
    deleteUserButton:{
        backgroundColor: 'red',
        alignSelf: 'center',
        marginTop:40,
        padding: 7,
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
        borderColor: 'blue',
        height: '50%',
        width: '100%',
        content: 'fill',
        marginBottom: 20,
    },
    addShiftButtonContainer: {
        marginTop: 0,
        backgroundColor: "grey",
        borderRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 2,
        alignSelf: 'flex-end',
        margin: 10,
    },
    addShiftButtonText: {
        fontSize: 30,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    shiftInput:{
        height: 30,
        margin: 2,
        alignSelf: 'center',
        width: '60%',
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

    // My Shifts
    shiftsContainer: {
        flex: 1,
        marginTop: 0,
    },
    shiftItem: {
        backgroundColor: 'grey',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    shiftText: {
        fontSize: 20,
        color: 'white'
    },
    shiftDeleteText:{  
        fontSize: 20,
        color: 'black',
    },
    shiftDeleteButton:{
        alignSelf: 'flex-end',
        marginTop: 0,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 5,
        alignSelf: 'flex-end',
        margin: 10,
    }, 
    
    // Estimated Pay
    payContainer: {
      backgroundColor: 'grey',
      padding: 20,
      marginVertical: 100,
      marginHorizontal: 16,
      alignSelf: 'center',
    },
    pay: {
      fontSize: 100,
      color: 'white',
      alignSelf: 'center',
    },

    // Job Categories
    myCategoriesButton:{
        alignSelf: 'flex-end',
        backgroundColor: "blue",
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
        backgroundColor: 'grey',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      categoryTitle: {
        fontSize: 25,
        color: 'white'
      },
      categorySearch:{
        height: 40,
        margin: 20,
        borderWidth: 1,
        padding: 10,
      },
})

export default AppNav