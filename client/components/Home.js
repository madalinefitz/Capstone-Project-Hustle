import React, {useEffect, useContext, useState} from 'react';
import {Text, Pressable, View, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Home({navigation}){

    return (
      <SafeAreaView>
        <Text>Home Screen</Text>
        <Button
          title="View Job Categories"
          onPress={() => navigation.navigate('Job Categories')}
        />
      </SafeAreaView>
    );
  }

export default Home