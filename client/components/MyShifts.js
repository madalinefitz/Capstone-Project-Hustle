import React, {useEffect, useContext, useState} from 'react';
import {Text, FlatList, Pressable, View, StyleSheet, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';


function MyShifts({navigation}){

    const {logout, userInfo} = useContext(AuthContext)
    const [myShifts, setMyShifts] = useState(userInfo.shifts)

    const Item = ({job_category, start_date_time, hourly_pay, location, end_date_time}) => (
        <View >
          <Text>{start_date_time}</Text>
          <Text>{end_date_time}</Text>
          <Text>{job_category}</Text>
          <Text>{location}</Text>
          <Text>{hourly_pay}</Text>
        </View>
      );
    

    return (
      <SafeAreaView>
            <Text>MyShifts</Text>
            <FlatList data={myShifts}
                renderItem={({item}) => <Item job_category={item.job_category.category_name} start_date_time={item.start_date_time} hourly_pay={item.hourly_pay} location={item.location} end_date_time={item.end_date_time}/>}
                keyExtractor={item => item.id}/>
            <Button title='logout' onPress={()=> {logout()}}/>
      </SafeAreaView>
    );
  }

export default MyShifts