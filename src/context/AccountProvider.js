import React, {useContext, useState, useEffect} from 'react'
import { VIEW_ACCOUNT_COMPONET, VIEW_NEW_ACCOUNT_COMPONET, VIEW_PAYMENT_HERE_COMPONET, VIEW_SELEC_TYPE_ACCOUNT_COMPONET } from './actions/actionTypes'
import { useAppContext } from './AppProvider'
import { internationalString, localString, tagUserData } from './env/determinants'
import { localSet } from './functions/localStorage'
const AccountContext = React.createContext()

const useAccountContext = () => { 
  return useContext(AccountContext)
}

const AccountProvider = ({ children }) => {

  let {
    userData, 
    accountsData, 
    setUserData
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
    setErrorMessage('')
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

    const localSelector = document.querySelector('.local')
    const internationalSelector = document.querySelector('.international')
    closeAllComponents()

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
    const totalyAssignedToThisAccount = accountsData?.filter(res=>{
      return res.accountNumber === value
    })
    return totalyAssignedToThisAccount.length
  }

  // delete account 
  function unselectPaymentAccount(e){
    let data = userData.depositAccounts?.filter(res=>{
      return res.accountNumber !== e.target.id
    })
    let newUserData = {...userData, depositAccounts:data}
    setUserData(newUserData)
    localSet(tagUserData, newUserData)
  }
  // select how much pay
  const handlerSelectedPaymentAccount = (e) => {
    setDataSelectedNewPayment(e.target.value)
  }


  // set pay 
  function sumbitSelectNewPaymentAccount(){
    const initialSelectedNewPaymentValue = {
      accountNumber: accountNumberState,
      typeAccount: typeAccountSelected,
      pay: dataSelectedNewPayment
    }
    const pay = parseInt(initialSelectedNewPaymentValue.pay)
    if(pay < 299 ) return setErrorMessage('The minimum to assign is 300.')
    if( pay > parseInt(salaryNotAssigned())) return setErrorMessage('You cannot assign more than the total.')
    if(userData.depositAccounts.length === 1){
      console.log(pay)
      if( pay !== parseInt(salaryNotAssigned())){
        return setErrorMessage('It is necessary to allocate the remaining total .') }
    } 
    if(!maxTwoAccountSelectedForPayConditional())return null
    
    setSuccessMessage('Account selected for receiving pay.')
    
    fadeOut('payhereComponent')

    let newUserData = {...userData, depositAccounts:[...userData.depositAccounts, initialSelectedNewPaymentValue]}
    setUserData(newUserData)
    localSet(tagUserData, newUserData)
    setTimeout(() => {
      closeAllComponents()
    },160)
  }

  function fadeOut(id){
    const selector = document.querySelector(`#${id}`).classList
    selector.remove('fade', 'in',  'down')
    selector.add('fade', 'out',  'down')

    setTimeout(() => {
      closeAllComponents()
    },160)
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
        closeAllComponents,
        sumbitSelectNewPaymentAccount,
        handlerSelectedPaymentAccount,
        typeAccountSelected, 
        dataFormForNewAccount,
        setDataFormForNewAccount,
        unselectPaymentAccount,
        accountalreadyDeclared,
        changeViewComponetns,
        maxTwoAccountSelectedForPayConditional,
        accountNumberState,
        payInThisAccount,
        fadeOut,
        successMessage,
        setSuccessMessage,
        setErrorMessage
      }}
    > 
      {children}
    </AccountContext.Provider>
  )
}
export { AccountProvider, useAccountContext }
