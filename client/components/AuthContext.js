import React, {createContext, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = React.createContext()

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const login = () => {
        setIsLoading(true)
        setUserToken('hello')
        AsyncStorage.setItem('userToken', userToken)
        setIsLoading(false)
    }

    const logout = () => {
        setUserToken(null)
        setIsLoading(false)
    }
    
    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken}}>
            {children}
        </AuthContext.Provider>
    )
}