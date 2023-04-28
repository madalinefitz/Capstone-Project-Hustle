import React, {useContext, useState} from "react"
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, Button, StyleSheet} from 'react-native'
import { AuthContext } from "./AuthContext"

function Login ({navigation}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useContext(AuthContext)
    

    return (
        <SafeAreaView>
            <View>
                <TextInput placeholder="Email" 
                    style={styles.input} value={email} onChangeText={text =>setEmail(text)}/>
                <TextInput style={styles.input}
                    placeholder="Password" value={password} onChangeText={text => setPassword(text)}/>
                <Button title='Login' onPress={()=>{login(email, password)}}/>
            </View>
        </SafeAreaView>
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

export default Login