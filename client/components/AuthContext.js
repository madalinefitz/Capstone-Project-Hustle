import React, {createContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    
    const [myShifts, setMyShifts] = useState('')
    const [myJobCategories, setMyJobCategories] = useState('')

    const login = (email, password, accountValidator) => {
        setIsLoading(true)
        const currentUser = {
            email: email, 
            _password_hash: password
        }
        fetch('http://127.0.0.1:5555/login', { 
                method:'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(currentUser)
                }
            )
                .then(r => {
                    if (r.status === 200){
                    r.json().then( (data) => {

                    setUserInfo(data.user)
                    setUserToken(data.token)
                    setMyShifts(data.user.shifts)
                    setMyJobCategories(data.user.job_categories)
                    
                    AsyncStorage.setItem('userToken', JSON.stringify(data.token))
                    AsyncStorage.setItem('userInfo', JSON.stringify(data.user))
                    
                    })
                } else {
                    accountValidator('account not found')
                    }
                })
        
        setIsLoading(false)
        
    }

    
    const createAccount = (firstName, lastName, newEmail, newPassword, newAccountValidator) => {
        setIsLoading(true)
        const newUser = {
            first_name: firstName,
            last_name: lastName,
            email: newEmail, 
            _password_hash: newPassword
        }
        fetch('http://127.0.0.1:5555/users', { 
                method:'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newUser)
                }
            )
                .then(r => {
                    if (r.status === 200){
                    r.json().then( (data) => {

                    setUserInfo(data.user)
                    setUserToken(data.token)
                    
                    AsyncStorage.setItem('userToken', JSON.stringify(data.token))
                    AsyncStorage.setItem('userInfo', JSON.stringify(data.user))
                    })
                } else {
                    newAccountValidator('email invalid')
                    }
                })
        
        setIsLoading(false)
    }

    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        setUserInfo(null)
        setMyShifts(null)
        setMyJobCategories(null)
        AsyncStorage.removeItem('userToken')
        AsyncStorage.removeItem('userInfo')
        setIsLoading(false)
        setMyShifts('')
        setMyJobCategories('')
    }

    const isLoggedIn = async() =>{
        try{
            setIsLoading(true)
            const funcUserToken = await AsyncStorage.getItem('userToken')
            const funcUserInfo = await AsyncStorage.getItem('userInfo')
            const theUserInfo = JSON.parse(funcUserInfo)
            const theUserToken = JSON.parse(funcUserToken)

            if(theUserToken) {
                setUserToken(theUserToken)
                setUserInfo(theUserInfo)
                setMyShifts(theUserInfo.shifts)
                setMyJobCategories(theUserInfo.job_categories)
            }
            setIsLoading(false)
        } catch(e) {
            console.log(`isLogged in error ${e}`)
        }
    }

    const updateUser = (editedUser) =>{
        setUserInfo(editedUser)
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.setItem('userInfo', JSON.stringify(editedUser))
    }

    const addNewShift = (createdShift) => {
  
        AsyncStorage.getItem( 'userInfo' )
          .then( data => {
            data = JSON.parse( data );
    
            data.shifts.push(createdShift)
            data.job_categories.push(createdShift.job_category)

    
            AsyncStorage.setItem( 'userInfo', JSON.stringify( data ) )
            setMyShifts([...data.shifts])
            setMyJobCategories([...data.job_categories])
    
          })
      }

    const deleteShift=(id)=>{
        fetch (`http://127.0.0.1:5555/shifts/${id}`, {method:'DELETE',})
          .then (r => r.json())

          AsyncStorage.getItem( 'userInfo' )
            .then( data => {
            data = JSON.parse( data )
    
            const currentShifts = data.shifts.filter(shift => {
                if (shift.id !== id){
                    return shift
                }})

            AsyncStorage.setItem( 'userInfo', JSON.stringify( {...data, shifts:currentShifts} ) )
            setMyShifts(currentShifts)
          })
    }

    const updateShift = (editedShift) => {
        const newShiftArray= myShifts.map(shift => {
            return(shift.id !== editedShift.id ? shift : editedShift)
        })

        setMyShifts(newShiftArray)
        AsyncStorage.getItem( 'userInfo' )
            .then( data => {
                data = JSON.parse( data )
                AsyncStorage.setItem( 'userInfo', JSON.stringify( {...data, shifts:newShiftArray} ) )
            })
    }

    const favoriteCategory = (favoritedCategory) => {
            setMyJobCategories([...myJobCategories, favoritedCategory])
            AsyncStorage.getItem( 'userInfo' )
                .then( data => {
            
                data = JSON.parse( data );
                AsyncStorage.setItem( 'userInfo', JSON.stringify( {...data, job_categories:[...myJobCategories, favoritedCategory]} ))
                })
    }

    const removeFavorite = (unfavoritedId) => {

        const newFavorites = myJobCategories.filter(c => {
            if (c.id !== unfavoritedId){
                return c
            }})
        setMyJobCategories(newFavorites)
       
        AsyncStorage.getItem( 'userInfo' )
            .then( data => {
            data = JSON.parse( data )

            AsyncStorage.setItem( 'userInfo', JSON.stringify( {...data, job_categories:newFavorites} ))
        })
    }   
    
    
    useEffect(()=>{
        isLoggedIn()
    }, [])

    
    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken, userInfo, createAccount, updateUser, addNewShift, myShifts, myJobCategories, deleteShift, updateShift, favoriteCategory, removeFavorite}}>
            {children}
        </AuthContext.Provider>
    )
}