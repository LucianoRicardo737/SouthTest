import React, {useState, useEffect} from 'react'

import { useAccountContext } from '../../context/AccountProvider'
import { useAppContext } from '../../context/AppProvider'
import {localSet ,getInLocalTheLocalAccounts} from '../../context/functions/localStorage'

const AddNewAccount = () => {
  const {
    setAccountsData
  } =useAppContext()
  const {
    typeAccountSelected,
    dataFormForNewAccount, 
    setDataFormForNewAccount,
    setErrorMessage,
    closeAllViews,
    accountalreadyDeclared
  } = useAccountContext()

  const addAccountStyle = {
    cont:{
      border: '1px solid rgb(237,237,238)',
      padding: '20px',
      borderRadius: '5px'
    }
  }
  
  const useField = ({name, label,type}) => {

    useEffect(()=>{
      setValue('')
    },[typeAccountSelected])

    const [value, setValue] = useState('')

    const handleChange = (e) => {
      setValue(e.target.value)
    }

    useEffect(()=>{
      setDataFormForNewAccount({ ...dataFormForNewAccount, [name]: value})
    },[value])

    return(
      <div className="field">
        <label>{label}</label>
        <input 
          onChange={handleChange}
          value={value}
          type={type} 
          name={name} />
      </div>
    )
  }
  const returnBankName = useField({
    label:'Bank Name *',
    name:'bankName',
    type:'text'
  })
  const returnBankAddress = useField({
    label:'Bank Address *',
    name:'bankAddress',
    type:'text'
  })
  const returnAccountNumber = useField({
    label:'Account Number *',
    name:'accountNumber',
    type:'number'
  })
  const returnTypeCoin = useField({
    label:'Type Coin *',
    name:'typeCoin',
    type:'text'
  })
  const returnSwiftNumber = useField({
    label:'Swift Number *',
    name:'swiftNumber',
    type:'text'
  })
  const returnPersonalAddress = useField({
    label:'Personal Address *',
    name:'beneficiaryAddress',
    type:'text'
  })

  const submitNewAccountForm = (e) => {
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
    if(accountalreadyDeclared(accountNumber)===1)return setErrorMessage('Account number is already declared.')
    if(!bankName) return setErrorMessage('Name bank is necessary.')
    if(!bankAddress) return setErrorMessage('Address bank is necessary.')
    if(!accountNumber) return setErrorMessage('Account number is necessary.')
    
    if(!beneficiaryAddress) return setErrorMessage('Your addres is necessary.')

    if(typeAccountSelected==='international'){
      if(!typeCoin) return setErrorMessage('Type coin is necessary.')
      if(!swiftNumber) return setErrorMessage('Swift number is necessary.')
    }

    
    let data = getInLocalTheLocalAccounts()
    let newObject = [...data,dataFormForNewAccount]
    localSet('accountsData', newObject)
    setAccountsData(getInLocalTheLocalAccounts())
  }
  
  return (
    <div style={addAccountStyle.cont} className='ui doubling stackable'>
      <form className="ui mini form" onSubmit={(e)=>submitNewAccountForm(e)}>
        <div className="three fields">
          {returnBankName }
          {returnBankAddress}
          {returnAccountNumber}
        </div>
        <div className="two fields">
          {typeAccountSelected!=='local' ? <>
            {returnTypeCoin}
            {returnSwiftNumber} </> : null
          }
          {returnPersonalAddress}
        </div>
        <button type='submit' className="ui button">Submit</button>
        <span onClick={()=>closeAllViews()} className="ui button">Close</span>
      </form>
    </div>
  )
}

export default AddNewAccount
