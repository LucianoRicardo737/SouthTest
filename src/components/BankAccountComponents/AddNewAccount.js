import React, {useState, useEffect} from 'react'

import { useAccountContext } from '../../context/AccountProvider'


const AddNewAccount = () => {

  const {
    typeAccountSelected,
    dataFormForNewAccount, 
    setDataFormForNewAccount,
    fadeOut,
    submitNewAccount
  } = useAccountContext()

  const addAccount_style = {
    cont:{
      border: '1px solid rgb(237,237,238)',
      padding: '20px',
      borderRadius: '5px',
      transition: '1s'
    },
    buttonGroup:{
      marginRight: '0px',
      justifyContent: 'right !important',
      justifyItems: 'center !important',
      alignItems: 'right !important',
      margin: 'auto'
    },
    submit:{
      color: '#0e76a8'
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

  return (
    <div id='addNewAccountComponent' style={addAccount_style.cont} className='ui doubling stackable transition animating in fade down'>
      <form className="ui mini form" onSubmit={(e)=>submitNewAccount(e)}>
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
       
        <button type='submit' style={addAccount_style.submit} className="ui button">Submit</button>
        <span onClick={()=>{fadeOut('addNewAccountComponent')}} className="ui button">Close</span>
       
      </form>
    </div>
  )
}

export default AddNewAccount
