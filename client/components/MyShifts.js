import React, {useEffect, useContext, useState} from 'react'
import {Text, FlatList, Pressable, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from './AuthContext'
import MyShiftItems from './MyShiftItems'


function MyShifts(){

    const {userInfo, myShifts} = useContext(AuthContext)
    
    return (
      <SafeAreaView style={styles.shiftsContainer}>
            <FlatList data={myShifts}
                renderItem={({item}) => <MyShiftItems job_category_name={item.job_category.category_name} job_category_id={item.job_category.id} start_date_time={item.start_date_time} hourly_pay={item.hourly_pay} location={item.location} end_date_time={item.end_date_time} id={item.id}/>}
                keyExtractor={item => item.id}/>
      </SafeAreaView>
    )
  }

export default MyShifts