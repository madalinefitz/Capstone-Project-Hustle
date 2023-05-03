import React, {useEffect, useContext, useState} from 'react';
import {Text, FlatList, Pressable, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';


function MyShifts(){

    const {logout, userInfo, myShifts} = useContext(AuthContext)


    const Item = ({job_category, start_date_time, hourly_pay, location, end_date_time}) => (
        <View style={styles.shiftItem}>
          <Text style={styles.shiftText}>Start: {start_date_time}</Text>
          <Text style={styles.shiftText}>End: {end_date_time}</Text>
          <Text style={styles.shiftText}>{job_category}</Text>
          <Text style={styles.shiftText}>{location}</Text>
          <Text style={styles.shiftText}>${hourly_pay}/hr</Text>
        </View>
      );
    

    return (
      <SafeAreaView style={styles.shiftsContainer}>
            <FlatList data={myShifts}
                renderItem={({item}) => <Item job_category={item.job_category.category_name} start_date_time={item.start_date_time} hourly_pay={item.hourly_pay} location={item.location} end_date_time={item.end_date_time}/>}
                keyExtractor={item => item.id}/>
      </SafeAreaView>
    );
  }

export default MyShifts