import React, {useContext, useState} from "react"
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, Button, StyleSheet} from 'react-native'
import { AuthContext } from "./AuthContext"

function CreateAccount({navigation}){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const {createAccount} = useContext(AuthContext)


    return(
        <View>
            <TextInput placeholder='First Name' style={styles.input} 
                value={firstName} onChangeText={text => setFirstName(text)}/>
            <TextInput placeholder='Last Name' style={styles.input} 
                value={lastName} onChangeText={text => setLastName(text)}/>
            <TextInput placeholder='Email' style={styles.input} 
                value={newEmail} onChangeText={text => setNewEmail(text)} />
            <TextInput placeholder='Password' style={styles.input} 
                value={newPassword} onChangeText={text => setNewPassword(text)}/>
            <Button title="Create Account" 
                onPress={()=>{createAccount(firstName, lastName, newEmail, newPassword)}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
});

export default CreateAccount