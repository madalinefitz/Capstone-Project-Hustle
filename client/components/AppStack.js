import {View, Text} from 'react-native'
import Home from './Home'
import JobCategories from './JobCategories'
import { SafeAreaView } from 'react-native-safe-area-context'

function AppStack ({navigation}){
    return(
        <SafeAreaView>
            <View>
                <Text>AppStack</Text>
                <Home/>
                <JobCategories/>
            </View>
        </SafeAreaView>
    )
}

export default AppStack