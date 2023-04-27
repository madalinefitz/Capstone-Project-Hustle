import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, Pressable, View, SafeAreaView, Button} from 'react-native';


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
      
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <FlatList data={jobCategories}
              renderItem={({item}) => <Item name={item.category_name} />}
              keyExtractor={item => item.id}/>
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