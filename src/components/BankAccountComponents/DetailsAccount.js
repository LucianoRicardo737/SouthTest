import React from 'react'
import { useAccountContext } from '../../context/AccountProvider'
const DetailsAccount = () => { 
  const {
    dataFormForNewAccount, 
    fadeOut, 
    payInThisAccount
  } = useAccountContext()

  const {
    beneficiary,
    beneficiaryAddress,
    accountNumber,
    bankName,
    bankAddress,
    typeCoin,
    swiftNumber
    // type
  } = dataFormForNewAccount

  const detailsAccount_style = {
    labelSpan:{
      fontWeight: 'bold',
      marginRight: '4px'
    },
    border:{
      marginBottom: '12px' 
    },
    subtitle:{
      fontWeight: 'bolder',
      fontSize: '15px'
    },
    pay:{
      marginLeft: '10px'
    }
  }

  const useField = ({label,data}) => {
    return (
      <div className='field'>
        <p className='' style={{wordWrap:'break-word'}}><span style={detailsAccount_style.labelSpan}>{label}</span><span>{data}</span></p>
      </div>
    )
  }

  const returnBankName = useField({
    label: 'Name:',
    data: bankName
  })
  const returnBankAddress = useField({
    label: 'Address:',
    data: bankAddress
  })
  const returnAccountNumber = useField({
    label: 'Acc. Number:',
    data: accountNumber
  })
  const returnTypeCoin = useField({
    label: 'Coint:',
    data: typeCoin
  })
  const returnSwiftNumber = useField({
    label: 'Swift Number:',
    data: swiftNumber
  })



  return (
    <div id='detailsAccountComponent' className='ui doubling stackable left transition animating fade in  down'>
      
      <div style={detailsAccount_style.border}>
        <span style={detailsAccount_style.subtitle} className=''>
          Account Information
        </span> 
        { payInThisAccount(accountNumber) && <>
          <span style={detailsAccount_style.pay} className=''>${payInThisAccount(accountNumber).pay}</span>
        </> }
      </div>
      <div className='ui mini form'>
        <div className="three fields">
          {returnBankName}
          {returnBankAddress}
          {returnAccountNumber}
        </div>
        <div className="three fields">
          {typeCoin&&
            returnTypeCoin
          }
          {swiftNumber&&
            returnSwiftNumber
          }
          <div className='field'>
            <p><span>{beneficiary}, </span><span>{beneficiaryAddress}</span>.</p>
          </div>
        </div>
      </div>
      <button onClick={()=>fadeOut('detailsAccountComponent')} className="ui button">Close</button>
    </div>
  )
}

export default DetailsAccount
