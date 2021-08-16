import React, {useContext, useState, useEffect} from 'react'
import { VIEW_ACCOUNT_COMPONET, VIEW_NEW_ACCOUNT_COMPONET, VIEW_PAYMENT_HERE_COMPONET, VIEW_SELEC_TYPE_ACCOUNT_COMPONET } from './actions/actionTypes'
import { useAppContext } from './AppProvider'
import { internationalString, localString, tagAccountData, tagUserData } from './env/env'
import { 
  accountCreated_message,
  accountDeleted_message,
  accountNumberIsAlreadyDeclared_message,
  accountNumberIsNecessary_message, 
  accountSelectForPay_message, 
  addressBankIsNecessary_message, 
  limitToAssign_message,
  minimumToAssign300_message, 
  nameBankIsNecessary_message, 
  selectTotalRemaning_message, 
  swiftNumberIsNecessary_message, 
  typeCoinIsNecessary_message, 
  yourAddressIsNecessary_message 
} from './env/globalMessagesText'

import { 
  getInLocalTheLocalAccounts, 
  localSet 
} from './functions/localStorage'

const AccountContext = React.createContext()

const useAccountContext = () => { 
  return useContext(AccountContext)
}

const AccountProvider = ({ children }) => {

  let {
    userData, 
    accountsData, 
    setUserData,
    setAccountsData
  } = useAppContext()

  //  local or international
  const [typeAccountSelected, setTypeAccountSelected] = useState(localString)
  // switch views
  const [viewNewAccountOrDetailAccount, setViewNewAccountOrDetailAccount] = useState(false)
  const [viewDetailAccount, setViewDetailAccount] = useState(false)
  const [viewPaymeHere, setViewPaymeHere] = useState(false)
  // account number
  const [accountNumberState,setAccountNumberState]=useState('')
  // const [paymeHereAccountNumber,setPaymeHereAccountNumber]=useState('')
  // for new account and view details
  const [dataFormForNewAccount, setDataFormForNewAccount] = useState(initialDataAccoutn)
  // view erros
  const [errorMessage, setErrorMessage]=useState('')
  const [successMessage, setSuccessMessage] = useState('')
  // select mount to pay in one account
  const [dataSelectedNewPayment, setDataSelectedNewPayment] = useState(0)

  function clearMessages (){
    setErrorMessage('')
    setSuccessMessage('')
  }
  // this effect is necessary to maintain actualize initial account when the type cambia 
  useEffect(()=>{
    try {
      setDataFormForNewAccount(initialDataAccoutn)
    } catch (error) {
      console.error
    }
  },[typeAccountSelected])

  function initialDataAccoutn () {
    let data = {
      beneficiary: `${userData.name} ${userData.lastname}`,
      beneficiaryAddress:'',
      accountNumber:0,
      bankName:'',
      bankAddress:'',
      typeCoin:'',
      swiftNumber:'',
      type:typeAccountSelected
    }
    return data
  }
  // close all components
  function closeAllComponents(){
    setViewNewAccountOrDetailAccount(false)
    setViewPaymeHere(false)
    setViewDetailAccount(false)
    setDataSelectedNewPayment(0)
  }
  function filterAccoutByAccountNumber(value){
    const accData = accountsData?.filter(res => { 
      return res.accountNumber === value 
    })
    return accData[0]
  }
  // switch views between components 
  function changeViewComponetns(value, e){

    const localSelector = document.querySelector(`.${localString}`)
    const internationalSelector = document.querySelector(`.${internationalString}`)
    closeAllComponents()
    clearMessages()

    switch (value) {
    case VIEW_ACCOUNT_COMPONET:
      setAccountNumberState(e.target.id)
      setDataFormForNewAccount(filterAccoutByAccountNumber(e.target.id))
      setViewDetailAccount(true)
      break
    case VIEW_PAYMENT_HERE_COMPONET:
      setAccountNumberState(e.target.id)
      setViewPaymeHere(true)
      break
    case VIEW_NEW_ACCOUNT_COMPONET:
      setViewNewAccountOrDetailAccount(true)
      break
    case VIEW_SELEC_TYPE_ACCOUNT_COMPONET:
      if(e === localString){
        setTypeAccountSelected(localString)
        internationalSelector.classList.remove('active')
        localSelector.classList.add('active')
      } else {
        setTypeAccountSelected(internationalString)
        localSelector.classList.remove('active')
        internationalSelector.classList.add('active')
      }
      break
    default: return closeAllComponents()
    }
  }
  // not assigned salary to account
  function salaryNotAssigned(){
    return userData.depositAccounts?.reduce((total, num)=>{
      return total - num.pay
    }, userData.monthlySalary)
  }

  // limit selected accounts 
  function maxTwoAccountSelectedForPayConditional(){
    if(salaryNotAssigned()===0) return false
    else if(userData.depositAccounts.length < 2) return true 
  }
  // conditional
  function payInThisAccount(value){
    const totalyAssignedToThisAccount = userData.depositAccounts?.filter(res=>{return res.accountNumber === value})
    return totalyAssignedToThisAccount[0]
  }

  // conditional
  function accountalreadyDeclared(value){
    const account = accountsData?.filter(res=>{
      return res.accountNumber === value
    })
    return account.length
  }


  // select how much pay
  const handlerSelectedPaymentAccount = (e) => {
    setDataSelectedNewPayment(e.target.value)
  }

  // effect for  components closed 
  function fadeOut(id){
    const selector = document.querySelector(`#${id}`).classList
    selector.remove('fade', 'in',  'down')
    selector.add('fade', 'out',  'down')
    id && clearMessages('')
    setTimeout(() => {
      closeAllComponents()
    },160)
  }

  // set pay 
  const submitNewPayment = () => {
    
    const initialSelectedNewPaymentValue = {
      accountNumber: accountNumberState,
      typeAccount: typeAccountSelected,
      pay: dataSelectedNewPayment
    }
    const pay = parseInt(initialSelectedNewPaymentValue.pay)
    if(pay < 299 ) return setErrorMessage(minimumToAssign300_message)
    if( pay > parseInt(salaryNotAssigned())) return setErrorMessage(limitToAssign_message)
    if(userData.depositAccounts.length === 1){
      if( pay !== parseInt(salaryNotAssigned())){
        return setErrorMessage(selectTotalRemaning_message) }
    } 
    if(!maxTwoAccountSelectedForPayConditional())return null
    

    let newUserData = {...userData, depositAccounts:[...userData.depositAccounts, initialSelectedNewPaymentValue]}
    // render dom
    setUserData(newUserData)
    localSet(tagUserData, newUserData)
    fadeOut('payhereComponent')
    setTimeout(() => {
      closeAllComponents()
      setSuccessMessage(accountSelectForPay_message)
    },160)
    

  }

  // delete account 
  const unselectPaymentAccount = (e) => {
    let data = userData.depositAccounts?.filter(res=>{
      return res.accountNumber !== e.target.id
    })
    let newUserData = {...userData, depositAccounts:data}
    setUserData(newUserData)
    localSet(tagUserData, newUserData)
    setTimeout(() => {
      clearMessages('')
      setSuccessMessage('unselected account')
    },140)
  }


  // create new account
  const submitNewAccount = (e) => {
    e.preventDefault()
    let {
      bankName,
      bankAddress,
      accountNumber,
      typeCoin,
      swiftNumber,
      beneficiaryAddress,
      type:typeAccountSelected
    } = dataFormForNewAccount

    if(!bankName) return setErrorMessage(nameBankIsNecessary_message)
    if(!bankAddress) return setErrorMessage(addressBankIsNecessary_message)
    if(!accountNumber) return setErrorMessage(accountNumberIsNecessary_message)
    if(accountalreadyDeclared(accountNumber)===1)return setErrorMessage(accountNumberIsAlreadyDeclared_message)
    
    if(!beneficiaryAddress) return setErrorMessage(yourAddressIsNecessary_message)

    if(typeAccountSelected===internationalString){
      if(!typeCoin) return setErrorMessage(typeCoinIsNecessary_message)
      if(!swiftNumber) return setErrorMessage(swiftNumberIsNecessary_message)
    }

    let data = getInLocalTheLocalAccounts()
    let newObject = [...data,dataFormForNewAccount]
    localSet(tagAccountData, newObject)
    setAccountsData(newObject)

    fadeOut('addNewAccountComponent')
    setSuccessMessage(accountCreated_message)
    setTimeout(() => {
      closeAllComponents()
    },140)
  }

  const deleteThisAccount = (e) => {
    e.preventDefault()
    unselectPaymentAccount(e)
    const newArrayWithoutDeletedAccount = accountsData?.filter(res=>{return res.accountNumber !== e.target.id})

    localSet(tagAccountData, newArrayWithoutDeletedAccount)
    setAccountsData(newArrayWithoutDeletedAccount)

    setTimeout(() => {
      closeAllComponents()
      setSuccessMessage(accountDeleted_message)
    },140)
  }
  


  return (
    <AccountContext.Provider
      value={{
        viewNewAccountOrDetailAccount,
        viewDetailAccount, 
        viewPaymeHere,
        errorMessage, 
        clearMessages,
        salaryNotAssigned,
        submitNewPayment,
        handlerSelectedPaymentAccount,
        typeAccountSelected, 
        dataFormForNewAccount,
        setDataFormForNewAccount,
        unselectPaymentAccount,
        changeViewComponetns,
        maxTwoAccountSelectedForPayConditional,
        accountNumberState,
        payInThisAccount,
        fadeOut,
        successMessage,
        submitNewAccount,
        deleteThisAccount
      }}
    > 
      {children}
    </AccountContext.Provider>
  )
}
export { AccountProvider, useAccountContext }
