import React, {useEffect, useState, useContext} from 'react'
import {FlatList, Text, Pressable, View, SafeAreaView, TextInput} from 'react-native'
import { AuthContext } from './AuthContext'



function JobCategories(){
    const {userInfo, favoriteCategory, removeFavorite} = useContext(AuthContext)

    const [jobCategories, setJobCategories] = useState([])
    const [myCategories, setMyCategories] = useState(false)
    const [searchedCategory, setSearchedCategory] = useState('')
    
    useEffect(()=>{
      fetch('http://127.0.0.1:5555/jobcategories')
        .then(r=>r.json())
        .then(data => setJobCategories(data))
    },[])

    const Item = ({name, id}) => (
      <View style={styles.categoryItem}>
        <Text style={styles.categoryTitle}>{name}</Text>
        <Pressable style={styles.favoriteButton} onPress={()=>handleFavorites(id)}>
          <Text style={styles.favoriteButton}>+</Text>
        </Pressable>
      </View>
    )
    const MyItem = ({name, id}) => (
      <View style={styles.categoryItem}>
        <Text style={styles.categoryTitle}>{name}</Text>
        <Pressable style={styles.favoriteButton} onPress={()=>handleUnfavorite(id)}>
          <Text style={styles.favoriteButton}>-</Text>
        </Pressable>
      </View>
    )

    const filterCategories = jobCategories.filter(job => {
        return (job.category_name.toLowerCase().includes(searchedCategory))
    })
    
    const uniqueCategories = [...new Map(userInfo.job_categories.map((c) => [c.category_name, c])).values()]
    // const uniqueCategories = userInfo.job_categories.filter((item, index) => {
    //   return index===userInfo.job_categories.findIndex(obj=>{
    //     return JSON.stringify(obj) ===JSON.stringify(item)
    //   })
    // })

    const handleFavorites = (id) => {
      jobCategories.filter((category) => {
        if (category.id === id){
          favoriteCategory(category)
        }
      })
    }

    const handleUnfavorite = (id => {
      removeFavorite(id)
    })
    
    return(
        <SafeAreaView style={styles.categoryContainer}>
          {myCategories ? (
            <>
              <Pressable style={styles.myCategoriesButton} onPress={()=>setMyCategories(!myCategories)}>
                <Text style={styles.myCategoriesButtonText}>View All Job Categories</Text>
              </Pressable>
              <FlatList data={uniqueCategories}
              renderItem={({item}) => <MyItem  name={item.category_name} id={item.id}/>}
              keyExtractor={item => item.id}/>
            </>
            ):(
            <>
              <Pressable style={styles.myCategoriesButton} onPress={()=>setMyCategories(!myCategories)}>
                <Text style={styles.myCategoriesButtonText}>View My Job Categories</Text>
              </Pressable>
              <TextInput onChangeText={(text)=>setSearchedCategory(text.toLowerCase())} style={styles.categorySearch} placeholder='search...'/>
              <FlatList data={filterCategories} 
                renderItem={({item}) => <Item name={item.category_name} id={item.id}/>}
                keyExtractor={item => item.id}/>
            </>
            )
          } 
        </SafeAreaView>
    );
  }

export default JobCategories