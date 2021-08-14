import { useAppContext } from '../../context/AppProvider'
import React from 'react'
import { useAccountContext } from '../../context/AccountProvider'
import {localSet, getInLocalTheLocalAccounts} from '../../context/functions/localStorage'
const AccountTable = () => {
  const localStyle = {
    account: {
      cursor: 'pointer'
    }
  }
  const { 
    accountsData,  
    setAccountsData 
  } = useAppContext()
  const {
    changeViewComponetns, 
    typeAccountSelected,
    isThisAccountSelectToPay, 
    maxTwoAccountSelectedForPayConditional, 
    unselectPaymentAccount 
  } = useAccountContext()

  const deleteThisAccount = (e) => {
    e.preventDefault()
    unselectPaymentAccount(e)
    let newArrayWithoutDeletedAccount = accountsData?.filter(res=>{return res.accountNumber !== e.target.id})
    localSet('accountsData', newArrayWithoutDeletedAccount)
    setAccountsData(getInLocalTheLocalAccounts())
  }
  return (
    <div>
      <table className='ui small table selectable center aligned '>
        <thead>
          <tr>
            <th>Bank</th>
            <th>Account Number</th>
            <th>Acctions</th>
          </tr>
        </thead>
        <tbody>
          {
            accountsData?.filter(res=>{return res.type === typeAccountSelected}).map(res => {
              return (
                <tr key={res.accountNumber}>
                  <td 
                    data-tooltip="View Details" 
                    data-position="right center" 
                    className='hover' 
                    style={localStyle.account} 
                    id={res.accountNumber} onClick={(e) => { changeViewComponetns('viewDetailsForThisAccountComponent', e) }}>{res.bankName}</td>
                  <td>{res.accountNumber}</td>
                  <td>
                    <div className="content">
                      {isThisAccountSelectToPay(res.accountNumber) ?
                        <button  
                          onClick={(e)=>changeViewComponetns( 'viewPaymentHereComponent',e)} 
                          id={res.accountNumber} 
                          className={maxTwoAccountSelectedForPayConditional() === true ? 'ui mini left attached linkedin button' : 'ui mini left attached linkedin button disabled'}>{maxTwoAccountSelectedForPayConditional() === true ? 'Payment Here': 'All Selected'}
                        </button>
                        :
                        <button 
                          onClick={(e)=>unselectPaymentAccount(e)} 
                          id={res.accountNumber} 
                          className='ui mini left attached  button'>
                          Unselect
                        </button>
                      }
                      <button 
                        onClick={(e)=>{deleteThisAccount(e)}} 
                        id={res.accountNumber} 
                        className='ui right attached google plus mini button'>
                        Delete</button>
                      {/* <i className=" trash alternate outline icon"></i> */}
                    </div>
                  </td>
                </tr>

              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default AccountTable
