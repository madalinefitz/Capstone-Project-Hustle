import React, {useEffect, useState, useContext} from 'react'
import {FlatList, Text, Pressable, View, SafeAreaView, TextInput} from 'react-native'
import { AuthContext } from './AuthContext'



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
    <View style={styles.categoryItem}>
      <Text style={styles.categoryTitle}>{name}</Text>
    </View>
  )

  const filterCategories = jobCategories.filter(job => {
    return (job.category_name.toLowerCase().includes(searchedCategory))
  })

    return(
        <SafeAreaView style={styles.categoryContainer}>
          {myCategories ? (
            <>
              <Pressable style={styles.myCategoriesButton} onPress={()=>setMyCategories(!myCategories)}>
                <Text style={styles.myCategoriesButtonText}>View All Job Categories</Text>
              </Pressable>
              <FlatList data={userInfo.job_categories}
              renderItem={({item}) => <Item  name={item.category_name} />}
              keyExtractor={item => item.id}/>
            </>
            ):(
            <>
              <Pressable style={styles.myCategoriesButton} onPress={()=>setMyCategories(!myCategories)}>
                <Text style={styles.myCategoriesButtonText}>View My Job Categories</Text>
              </Pressable>
              <TextInput onChangeText={(text)=>setSearchedCategory(text.toLowerCase())} style={styles.categorySearch} placeholder='search...'/>
              <FlatList data={filterCategories} 
                renderItem={({item}) => <Item name={item.category_name} />}
                keyExtractor={item => item.id}/>
            </>
            )
          } 
        </SafeAreaView>
    );
  }

export default JobCategories