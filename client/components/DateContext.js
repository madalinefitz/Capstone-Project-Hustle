import React, {createContext} from 'react'


export const DateContext = createContext()


export const DateProvider=({children})=> {

    const today = new Date()
    const first = today.getDate() - today.getDay()
    const last = first + 7

    const firstday = new Date(today.setDate(first)).toDateString()
    const lastday = new Date(today.setDate(last)).toDateString()

    return (
        <DateContext.Provider value={{firstday, lastday}}>
            {children}
        </DateContext.Provider>
    )

}