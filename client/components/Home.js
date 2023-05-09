import React, {useEffect, useContext, useState} from 'react';
import {Text, Pressable, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';
import { DateContext } from './DateContext';


function Home({navigation}){

    const {userInfo} = useContext(AuthContext)
    const {firstday, lastday} = useContext(DateContext)


    

    return (
      <SafeAreaView >
            <Text style={styles.welcomeUser}>{userInfo.first_name}'s Hustle</Text>
            <Text style={styles.date}>{firstday} - {lastday}</Text>
            <Pressable
              onPress={() => navigation.navigate('Calendar Container')} style={styles.homeButtons}>
                <Text style={styles.homeButtonsText}>View Calendar</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate('My Shifts')} style={styles.homeButtons}>
                <Text style={styles.homeButtonsText}>My Shifts</Text>
              </Pressable>
            <Pressable
            onPress={() => navigation.navigate('Estimated Pay')} style={styles.homeButtons}>
              <Text style={styles.homeButtonsText}>Estimated Pay</Text>
            </Pressable>
            <Pressable
            onPress={() => navigation.navigate('Job Categories')} style={styles.homeButtons}>
              <Text style={styles.homeButtonsText}>Job Categories</Text>
            </Pressable>
      </SafeAreaView>
    );
  }

export default Home
