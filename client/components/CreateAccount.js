import React, {useContext, useState} from "react"
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native'
import { AuthContext } from "./AuthContext"

function CreateAccount(){
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
        marginTop: 15,
        marginBottom:5,
        height: 45,
        marginHorizontal: 20,
        borderWidth: 1,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#C3C9E9',
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
    button:{
        marginTop: 40,
        backgroundColor: "#858AE3",
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
        color: "#EEF0F2",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        paddingVertical: 3,
    },
    accountValidation:{
        color: '#1C2541',
        alignSelf: 'flex-end',
        marginEnd: 18,
        fontSize: 20
    },
    validation:{
        color: '#1C2541',
        marginHorizontal: 20,
        marginTop:0,
    },
});

export default CreateAccount