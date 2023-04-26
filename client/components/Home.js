import React, {useEffect, useState} from 'react';
import {Text, Pressable, View, SafeAreaView, Button} from 'react-native';



function Home({navigation}){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="View Job Categories"
          onPress={() => navigation.navigate('Job Categories')}
        />
      </View>
    );
  }

export default Home