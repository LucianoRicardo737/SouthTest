import React from 'react'
import { useAccountContext } from '../../context/AccountProvider'
const DetailsAccount = () => { 
  const {
    dataAccount, 
    closeAllViews, 
    isAssigned
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
  } = dataAccount

  const detailsAccountStyle = {
    cont:{
      border: '1px solid rgb(237,237,238)',
      padding: '20px',
      borderRadius: '5px'
    },
    labelSpan:{
      fontWeight: 'bold',
      marginRight: '4px'
    }
  }

  const useField = ({label,data}) => {
    return (
      <div className='field '>
        <p className=''><span style={detailsAccountStyle.labelSpan}>{label}</span><span>{data}</span></p>
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
    <div style={detailsAccountStyle.cont} className='ui doubling stackable left '>
      <h3>Account Information {isAssigned(accountNumber)!==false ? <i className="dollar sign icon"></i> : null }</h3>
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
      <button onClick={()=>closeAllViews()} className="ui button">Close</button>
    </div>
  )
}

export default DetailsAccount
