import React, {useContext, useState, useEffect} from 'react'
import { useAppContext } from './AppProvider'
import { internationalString, localString, tagUserData } from './env/determinants'
import { localSet } from './functions/localStorage'
const AccountContext = React.createContext()

const useAccountContext = () => { 
  return useContext(AccountContext)
}

const AccountProvider = ({ children }) => {

  let {userData, accountsData, setUserData} = useAppContext()
  const [typeAccountSelected, setTypeAccountSelected] = useState(localString)

  const initialDataAccoutn = {
    beneficiary: `${userData.name} ${userData.lastname}`,
    beneficiaryAddress:'',
    accountNumber:0,
    bankName:'',
    bankAddress:'',
    typeCoin:'',
    swiftNumber:'',
    type:typeAccountSelected
  }
  
  const [viewNewAccountOrDetailAccount, setViewNewAccountOrDetailAccount] = useState(false)
  const [viewDetailAccount, setViewDetailAccount] = useState(false)
  const [viewPaymeHere, setViewPaymeHere] = useState(false)

  const [paymeHereAccountNumber,setPaymeHereAccountNumber]=useState('')
  const [dataAccount, setDataAccount] = useState (initialDataAccoutn) 

  const [dataFormForNewAccount, setDataFormForNewAccount] = useState(initialDataAccoutn)

  const [errorMessage, setErrorMessage]=useState('')

  const [dataSelectedNewPayment, setDataSelectedNewPayment] = useState(300)

  useEffect(()=>{
    try {
      setDataFormForNewAccount(initialDataAccoutn)
    } catch (error) {
      console.log(error)
    }
  },[typeAccountSelected])

  function closeAllViews(){
    setViewNewAccountOrDetailAccount(false)
    setViewPaymeHere(false)
    setViewDetailAccount(false)
    setErrorMessage('')
    setDataFormForNewAccount(initialDataAccoutn)
  }


  function seeDetailsForThisAccount (e) {
    const accData = accountsData?.filter(res => { 
      return res.accountNumber === e.target.id 
    })
    setDataAccount(accData[0])
    closeAllViews()
    setViewDetailAccount(true)
  }

  function seePaymetHere(e){
    closeAllViews()
    setViewPaymeHere(true)
    setPaymeHereAccountNumber(e.target.id)
    setErrorMessage('')
  }
  
  function viewNewAccountComponetn (){
    closeAllViews()
    setViewNewAccountOrDetailAccount(true)
  }

  function changeTypeAccount(action) {

    const localSelector = document.querySelector('.local')
    const internationalSelector = document.querySelector('.international')
    closeAllViews()
    
    if(action === localString){
      setTypeAccountSelected(localString)
      internationalSelector.classList.remove('active')
      localSelector.classList.add('active')
    } else {
      setTypeAccountSelected(internationalString)
      localSelector.classList.remove('active')
      internationalSelector.classList.add('active')
    }
  }

  function salaryNotAssigned(){
    let maxSalaryToAssigned = userData.depositAccounts?.reduce((total, num)=>{return total - num.pay
    }, userData.monthlySalary)
    if(salaryAssignedToThisCount()){
      maxSalaryToAssigned + salaryAssignedToThisCount()
    }
    return maxSalaryToAssigned.toString()
  }

  function salaryAssignedToThisCount(){
    const totalyAssignedToThisAccount = userData.depositAccounts?.filter(res=>{
      return res.accountNumber === paymeHereAccountNumber
    }).map(res=>{return res.pay})
    return totalyAssignedToThisAccount[0]
  }
  
  function isAssigned(value){
    const totalyAssignedToThisAccount = userData.depositAccounts?.filter(res=>{
      return res.accountNumber === value
    }).map(res=>{return res.pay})
    if(!totalyAssignedToThisAccount[0]) return false
    
  }

  function accountalreadyDeclared(value){
    const totalyAssignedToThisAccount = accountsData?.filter(res=>{
      return res.accountNumber === value
    })
    return totalyAssignedToThisAccount.length
  }

  function allAsigned(){
    if(salaryNotAssigned()[0]==='0'){ return true
    }else{ return false}
  }

  function maxTwoSelected(){
    if(allAsigned()===true) {return false} 
    else if(userData.depositAccounts.length < 2) return true 
  }

  function unselectPayment(e){
    let data = userData.depositAccounts.filter(res=>{
      return res.accountNumber !== e.target.id
    })
    let newUserData = {...userData, depositAccounts:data}
    setUserData(newUserData)
    localSet(tagUserData, newUserData)
  }


  const handlerSelectedPaymentAccount = (e) => {
    setDataSelectedNewPayment(e.target.value)
  }

  function sumbitSelectNewPaymentAccount(){
    const initialSelectedNewPaymentValue = {
      accountNumber: paymeHereAccountNumber,
      typeAccount: typeAccountSelected,
      pay: dataSelectedNewPayment
    }
    let { pay } = initialSelectedNewPaymentValue
    
    if( parseInt(pay) < 299 ) return setErrorMessage('The minimum to assign is 300.')
    if( parseInt(pay) >  parseInt(salaryNotAssigned())) return setErrorMessage('You cannot assign more than the total.')
    if(userData.depositAccounts.length === 1){
      if( parseInt(pay) !== parseInt(salaryNotAssigned())){
        return setErrorMessage('It is necessary to allocate the remaining total .') }
    } 

    if(!maxTwoSelected())return null
    let newUserData = {...userData, depositAccounts:[...userData.depositAccounts, initialSelectedNewPaymentValue]}
    setUserData(newUserData)
    localSet(tagUserData, newUserData)
    setViewPaymeHere(false)
  }


  return (
    <AccountContext.Provider
      value={{
        seeDetailsForThisAccount,
        dataAccount,
        setDataAccount,
        viewNewAccountOrDetailAccount,
        changeTypeAccount,
        viewDetailAccount, 
        viewNewAccountComponetn,
        viewPaymeHere,
        errorMessage, 
        setErrorMessage,
        salaryNotAssigned,
        closeAllViews,
        sumbitSelectNewPaymentAccount,
        handlerSelectedPaymentAccount,
        isAssigned,
        typeAccountSelected, 
        dataFormForNewAccount,
        setDataFormForNewAccount,
        seePaymetHere,
        maxTwoSelected,
        unselectPayment,

        accountalreadyDeclared
        
      }}
    > 
      {children}
    </AccountContext.Provider>
  )
}

export { AccountProvider, useAccountContext }