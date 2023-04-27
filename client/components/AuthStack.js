import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import {View, Text} from 'react-native'
import Login from './Login'

function AuthStack({navigation}){
    return(
        <SafeAreaView>
            <View>
                <Text>Auth Stack</Text>
                <Login/>
                {/* <CreateAccount/> */}
            </View>
        </SafeAreaView>
    )
}

export default AuthStack