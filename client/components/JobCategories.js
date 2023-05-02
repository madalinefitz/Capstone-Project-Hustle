import React, {useEffect, useState, useContext} from 'react';
import {FlatList, StyleSheet, Text, Pressable, View, SafeAreaView, } from 'react-native';
import { AuthContext } from './AuthContext';



function JobCategories(){
  const {userInfo} = useContext(AuthContext)

  const [jobCategories, setJobCategories] = useState([])
  const [myCategories, setMyCategories] = useState(false)
  
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
          {myCategories? (
            <>
              <Pressable style={styles.button} onPress={()=>setMyCategories(!myCategories)}>
                <Text style={styles.buttonText}>All Job Categories</Text>
              </Pressable>
              <FlatList data={userInfo.job_categories}
              renderItem={({item}) => <Item name={item.category_name} />}
              keyExtractor={item => item.id}/>
            </>
            ):(
            <>
              <Pressable style={styles.button} onPress={()=>setMyCategories(!myCategories)}>
                <Text style={styles.buttonText}>My Job Categories</Text>
              </Pressable>
              <FlatList data={jobCategories}
                renderItem={({item}) => <Item name={item.category_name} />}
                keyExtractor={item => item.id}/>
            </>
            )
          } 
        </SafeAreaView>
    );
  }

styles = StyleSheet.create({
  button:{
    color: 'white'
  },
  buttonText:{
    color: 'blue'
  }
})

export default JobCategories