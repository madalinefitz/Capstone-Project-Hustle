import React, {useContext, useState} from "react"
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Pressable} from 'react-native'
import { AuthContext } from "./AuthContext"

function CreateAccount({navigation}){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [newAccountValidation, setNewAccountValidation] = useState('')

    const {createAccount} = useContext(AuthContext)


    const firstNameValidator = inputFirst => {
        if (!inputFirst) {
            return "*Name is required";
          } else return "";
    }


    const emailValidator = inputEmail => {
        if (!inputEmail) {
            return '*Email is required'
        } else if (inputEmail.includes('@')) {
          return "";
        } else return('*Incorrect email format')
    }
    
    const newAccountValidator = accountError => {
        setNewAccountValidation(accountError)
    }


    return(
        <View style={styles.conatainer}>
            <Text style={styles.accountValidation}>{newAccountValidation}</Text>
            <TextInput placeholder='First Name' style={styles.input} 
                value={firstName} onChangeText={text => setFirstName(text)}/>
            <Text style={styles.validation}>{firstNameValidator(firstName)}</Text>
            <TextInput placeholder='Last Name' style={styles.input} 
                value={lastName} onChangeText={text => setLastName(text)}/>
            <TextInput placeholder='Email' style={styles.input} 
                value={newEmail} onChangeText={text => setNewEmail(text)} autoCapitalize='none'/>
            <Text style={styles.validation}>{emailValidator(newEmail)}</Text>
            <TextInput placeholder='Password' style={styles.input} secureTextEntry={true}
                value={newPassword} onChangeText={text => setNewPassword(text)} autoCapitalize='none'/>
            <Pressable style={styles.button} onPress={()=>{createAccount(firstName, lastName, newEmail, newPassword, newAccountValidator)}}>
                    <Text style={styles.buttonText}>Create Account</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    conatainer: {
        marginTop: 30
    },
    input: {
        marginTop: 20,
        marginBottom:0,
        height: 40,
        marginHorizontal: 20,
        borderWidth: 1,
        padding: 10,
    },
    button:{
        marginTop: 20,
        backgroundColor: "blue",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 2,
        alignSelf: 'center',
        marginVertical: 30,
        marginHorizontal: 10,
        width: '80%'
    },
    buttonText:{
        fontSize: 25,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        paddingVertical: 3,
    },
    accountValidation:{
        color: 'red',
        alignSelf: 'flex-end',
        marginEnd: 18,
        fontSize: 20
    },
    validation:{
        color: 'red',
        marginHorizontal: 20,
        marginTop:0,
    },
});

export default CreateAccount