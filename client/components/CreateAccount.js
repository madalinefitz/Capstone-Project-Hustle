import React, {useContext, useState} from "react"
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Pressable} from 'react-native'
import { AuthContext } from "./AuthContext"

function CreateAccount({navigation}){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const {createAccount} = useContext(AuthContext)


    return(
        <View style={styles.conatainer}>
            <TextInput placeholder='First Name' style={styles.input} 
                value={firstName} onChangeText={text => setFirstName(text)}/>
            <TextInput placeholder='Last Name' style={styles.input} 
                value={lastName} onChangeText={text => setLastName(text)}/>
            <TextInput placeholder='Email' style={styles.input} 
                value={newEmail} onChangeText={text => setNewEmail(text)} autoCapitalize='none'/>
            <TextInput placeholder='Password' style={styles.input} 
                value={newPassword} onChangeText={text => setNewPassword(text)} autoCapitalize='none'/>
            <Pressable style={styles.button} onPress={()=>{createAccount(firstName, lastName, newEmail, newPassword)}}>
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
        margin: 20,
        height: 40,
        margin: 12,
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
});

export default CreateAccount