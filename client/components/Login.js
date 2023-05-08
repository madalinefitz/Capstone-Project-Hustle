import React, {useContext, useState} from "react"
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Pressable} from 'react-native'
import { AuthContext } from "./AuthContext"

function Login ({navigation}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useContext(AuthContext)
    const [accountValidation, setAccountValidation] = useState('')
    

    const emailValidator = inputEmail => {
        if (!inputEmail) {
            return('*Email is required')
        } else if (inputEmail.includes('@')) {
          return "";
        } else return('*Incorrect email format')
    }
    
    const accountValidator = accountError => {
        setAccountValidation(accountError)
    }


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.accountValidation}>{accountValidation}</Text>
                <TextInput placeholder='Email'
                    style={styles.input} value={email} onChangeText={text =>setEmail(text)} autoCapitalize='none'/>
                <Text style={styles.emailValidation}>{emailValidator(email)}</Text>
                <TextInput style={styles.input} secureTextEntry={true}
                    placeholder='Password' value={password} onChangeText={text => setPassword(text)} autoCapitalize='none'/>
                <Pressable style={styles.button} onPress={()=>{login(email, password, accountValidator)}}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable> 
                <Text style={styles.text}>New to Hustle?</Text>
                <Pressable style={styles.button2} onPress={() => navigation.navigate('Create Account')}>
                    <Text style={styles.button2Text}>Create Account</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        marginVertical: 70,
    },
    input: {
        height: 40,
        margin: 2,
        marginHorizontal: 20,
        color: '#1C2541',
        borderWidth: 1,
        padding: 10,
    },
    text: {
        fontSize:20,
        alignSelf: 'center',
        paddingTop: 80,
        paddingBottom: 20,
        
    },
    button:{
        backgroundColor: "#1C2541",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 2,
        alignSelf: 'center',
        marginVertical: 30,
        marginHorizontal: 10,
        width: '50%'
    },
    buttonText:{
        fontSize: 25,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        paddingVertical: 3,
    },
    button2:{
        backgroundColor: "#1C2541",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 2,
        alignSelf: 'center',
        marginHorizontal: 10,
        width: '50%',
    },
    button2Text:{
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        paddingVertical: 3,
    },
    emailValidation:{
        color: '#1C2541',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    accountValidation:{
        color: '#1C2541',
        alignSelf: 'flex-end',
        marginEnd: 18,
        fontSize: 20
    },

});

export default Login