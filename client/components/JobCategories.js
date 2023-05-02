import React, {useEffect, useState, useContext} from 'react'
import {FlatList, StyleSheet, Text, Pressable, View, SafeAreaView, TextInput} from 'react-native'
import { AuthContext } from './AuthContext'
import { SearchBar } from 'react-native-elements'



function JobCategories(){
  const {userInfo} = useContext(AuthContext)

  const [jobCategories, setJobCategories] = useState([])
  const [myCategories, setMyCategories] = useState(false)
  const [searchedCategory, setSearchedCategory] = useState('')
  
  useEffect(()=>{
    fetch('http://127.0.0.1:5555/jobcategories')
      .then(r=>r.json())
      .then(data => setJobCategories(data))
  },[])

  const Item = ({name}) => (
    <View style={styles.item}>
      <Text style={styles.title} >{name}</Text>
    </View>
  )

  const filterCategories = jobCategories.filter(job => {
    return (job.category_name.toLowerCase().includes(searchedCategory))
  })

  console.log(searchedCategory)
    return (
      
        <SafeAreaView style={styles.container}>
          {myCategories ? (
            <>
              {/* <SearchBar
                placeholder="Type Here..."
              /> */}
              <Pressable style={styles.button} onPress={()=>setMyCategories(!myCategories)}>
                <Text style={styles.buttonText}>View All Job Categories</Text>
              </Pressable>
              <FlatList data={userInfo.job_categories}
              renderItem={({item}) => <Item  name={item.category_name} />}
              keyExtractor={item => item.id}/>
            </>
            ):(
            <>
              <Pressable style={styles.button} onPress={()=>setMyCategories(!myCategories)}>
                <Text style={styles.buttonText}>View My Job Categories</Text>
              </Pressable>
              <TextInput onChangeText={(text)=>setSearchedCategory(text.toLowerCase())} style={styles.search} placeholder='search...'/>
              <FlatList data={filterCategories} 
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
    alignSelf: 'flex-end',
    backgroundColor: "blue",
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 2,
    marginVertical: 30,
    marginHorizontal: 10,
    width: '60%'
  },
  buttonText:{
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    marginTop: 0,
  },
  item: {
    backgroundColor: 'grey',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
    color: 'white'
  },
  search:{
    height: 40,
    margin: 20,
    borderWidth: 1,
    padding: 10,
  }
})

export default JobCategories