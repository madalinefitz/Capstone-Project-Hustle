import {View, Text} from 'react-native'
import Home from './Home'
import JobCategories from './JobCategories'

function AppStack ({navigation}){
    return(
        <View>
            <Text>AppStack</Text>
            <Home/>
            <JobCategories/>
        </View>
    )
}

export default AppStack