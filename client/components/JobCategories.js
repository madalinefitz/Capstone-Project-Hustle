import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, Pressable, View, SafeAreaView, Button} from 'react-native';


function JobCategories({navigation}){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
        <Button
          title="Go to Job Categories... again"
          onPress={() => navigation.push('Job Categories')}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
        <Button
          title="Go back to first screen in stack"
          onPress={() => navigation.popToTop()}
        />
      </View>
    );
  }

export default JobCategories