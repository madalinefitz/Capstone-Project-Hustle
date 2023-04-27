import React, {useContext} from "react"
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, Button} from 'react-native'
import { AuthContext } from "./AuthContext"

function Login ({navigation}){
    const {login} = useContext(AuthContext)

    return (
        <SafeAreaView>
            <View>
                
                <Text>Login</Text>
                <TextInput label="Email"/>
                <Button title='Login' onPress={()=>{login()}}/>
            </View>
        </SafeAreaView>
    )

}

export default Login