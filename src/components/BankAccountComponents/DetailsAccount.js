import React from 'react'
import { useAccountContext } from '../../context/AccountProvider'
const DetailsAccount = () => { 
  const {
    dataFormForNewAccount, 
    closeAllComponents, 
    isThisAccountSelectToPay
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

  const detailsAccountStyle = {
    // cont:{
    //   border: '1px solid rgb(237,237,238)',
    //   padding: '20px',
    //   borderRadius: '5px'
    // },
    labelSpan:{
      fontWeight: 'bold',
      marginRight: '4px'
    }
  }

  const useField = ({label,data}) => {
    return (
      <div className='field'>
        <p className='' style={{wordWrap:'break-word'}}><span style={detailsAccountStyle.labelSpan}>{label}</span><span>{data}</span></p>
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
    <div className='ui doubling stackable left '>
      <h3>Account Information {!isThisAccountSelectToPay(accountNumber) && <i className="dollar sign icon"></i> }</h3>
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
      <button onClick={()=>closeAllComponents()} className="ui button">Close</button>
    </div>
  )
}

export default DetailsAccount
