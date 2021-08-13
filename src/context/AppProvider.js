import React, { useState, useContext } from 'react'
import { initialUserData, initialAccountsData } from '../db/initialData_db'
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
        initialUserData,
        userData,
        setUserData,
        initialAccountsData,
        accountsData, setAccountsData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppProvider, useAppContext }
