import React, {createContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)


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
        AsyncStorage.removeItem('userToken')
        AsyncStorage.removeItem('userInfo')
        setIsLoading(false)
    }
    
    const updateUser = (editedUser) =>{
        setUserInfo(editedUser)
        AsyncStorage.removeItem('userInfo')
        AsyncStorage.setItem('userInfo', JSON.stringify(editedUser))
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
            }
            setIsLoading(false)
        } catch(e) {
            console.log(`isLogged in error ${e}`)
        }
    }

    useEffect(()=>{
        isLoggedIn()
    }, [])

    
    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken, userInfo, createAccount, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}