import React, { useState, useContext } from 'react'
import { getInLocalTheLocalAccounts, getInLocalTheUserData } from './functions/localStorage'

const AppContext = React.createContext()

const useAppContext = () => {
  return useContext(AppContext)
}

const AppProvider = ({ children }) => {

  const [accountsData, setAccountsData] = useState(getInLocalTheLocalAccounts)
  const [userData, setUserData]=useState(getInLocalTheUserData)
  
  return (
    <AppContext.Provider
      value={{
        userData,
        setUserData,
        accountsData, 
        setAccountsData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, useAppContext }
