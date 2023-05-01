import React, {useEffect, useContext, useState} from 'react';
import {Text, Pressable, View, StyleSheet, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';


function Home({navigation}){

    const {userInfo, logout} = useContext(AuthContext)
    

    return (
      <SafeAreaView>
            <Text>Welcome {userInfo.first_name}</Text>
            
            <Button
              title="View Calendar"
              onPress={() => navigation.navigate('Calendar Container')}/>
            <Button
              title="My Shifts"
              onPress={() => navigation.navigate('My Shifts')}/>
            <Button
              title="Estimated Pay"
              onPress={() => navigation.navigate('Estimated Pay')}/>
            <Button
              title="All Job Categories"
              onPress={() => navigation.navigate('Job Categories')}/>
            <Button title='logout' onPress={()=> {logout()}}/>
      </SafeAreaView>
    );
  }

export default Home