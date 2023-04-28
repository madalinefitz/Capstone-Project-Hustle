import React, {createContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = React.createContext()

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)


    const login = (email, password) => {
        setIsLoading(true)
        const currentUser = {
            email: email, 
            _password_hash: password
        }
        console.log(currentUser)
        fetch('http://127.0.0.1:5555/login', { 
                method:'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(currentUser)
                }
            )
                .then(r => {
                    if (r.status === 200){
                    console.log(r)
                    let token = r
                    // setUserInfo(user)
                    setUserToken(token)
                    

                    AsyncStorage.setItem('userToken', JSON.stringify(token))
                    // AsyncStorage.setItem('userInfo', JSON.stringify(user))
                
                    } else {
                    console.log('login failure')
                    }
                    })
        
        setIsLoading(false)
    }

    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        AsyncStorage.removeItem('userToken')
        // AsyncStorage.removeItem('userInfo')
        setIsLoading(false)
    }

    const isLoggedIn = async() =>{
        try{
            setIsLoading(true)
            let funcUserToken = await AsyncStorage.getItem('userToken')
            // let funcUserInfo = await AsyncStorage.getItem('userInfo')
            // const theUserInfo = JSON.parse(funcUserInfo)

            if(funcUserToken) {
                setUserToken(funcUserToken)
                // setUserInfo(theUserInfo)
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
        <AuthContext.Provider value={{login, logout, isLoading, userToken}}>
            {children}
        </AuthContext.Provider>
    )
}