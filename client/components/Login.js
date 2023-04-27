import React from "react"
import {SafeAreaView, View, Text, TextInput, TouchableOpacity} from 'react-native'

function Login ({navigation}){

    return (
        <SafeAreaView>
            <View>
                <Text>Login</Text>
                <TextInput label="Email"/>
            </View>
        </SafeAreaView>
    )

}

export default Login