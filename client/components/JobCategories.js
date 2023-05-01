import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, Pressable, View, SafeAreaView, } from 'react-native';



function JobCategories({navigation}){
  const [jobCategories, setJobCategories] = useState([])
  
  useEffect(()=>{
    fetch('http://127.0.0.1:5555/jobcategories')
      .then(r=>r.json())
      .then(data => setJobCategories(data))
  },[])

  const Item = ({name}) => (
    <View >
      <Text >{name}</Text>
    </View>
  );
    return (
      
        <SafeAreaView >
          <FlatList data={jobCategories}
              renderItem={({item}) => <Item name={item.category_name} />}
              keyExtractor={item => item.id}/>
        </SafeAreaView>
    );
  }

export default JobCategories