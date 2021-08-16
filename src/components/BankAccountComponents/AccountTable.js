import { useAppContext } from '../../context/AppProvider'
import React from 'react'
import { useAccountContext } from '../../context/AccountProvider'
import {localSet, getInLocalTheLocalAccounts} from '../../context/functions/localStorage'
import DetailsAccount from './DetailsAccount'
import PaymeHere from './PaymeHere'
import { VIEW_ACCOUNT_COMPONET, VIEW_PAYMENT_HERE_COMPONET } from '../../context/actions/actionTypes'
import { tagAccountData } from '../../context/env/env'
const AccountTable = () => {
  const accountTable_style = {
    account: {
      cursor: 'pointer',
      color: '#0e76a8'
    },
    buttonPayHere:{
      color: '#0e76a8'
    }
  }
  const { 
    accountsData,  
    setAccountsData 
  } = useAppContext()
  const {
    changeViewComponetns, 
    typeAccountSelected,
    payInThisAccount, 
    maxTwoAccountSelectedForPayConditional, 
    unselectPaymentAccount,
    viewDetailAccount,
    viewPaymeHere,
    accountNumberState
  } = useAccountContext()

  const deleteThisAccount = (e) => {
    e.preventDefault()
    unselectPaymentAccount(e)
    const newArrayWithoutDeletedAccount = accountsData?.filter(res=>{return res.accountNumber !== e.target.id})
    localSet(tagAccountData, newArrayWithoutDeletedAccount)
    setAccountsData(getInLocalTheLocalAccounts())
  }
  return (
    <div>
      <table className='ui small tree column table selectable '>
        <thead>
          <tr>
            <th>Bank</th>
            <th>Account Number</th>
            <th>Acctions</th>
          </tr>
        </thead>
        {
          accountsData?.filter(res=>{return res.type === typeAccountSelected}).map(res => {
            return ( 
              <tbody key={res.accountNumber}>
                <tr >
                  <td 
                    // data-tooltip="View Details" 
                    // data-position="right center" 
                    className='hover' 
                    style={accountTable_style.account} 
                    id={res.accountNumber} onClick={(e) => { changeViewComponetns(VIEW_ACCOUNT_COMPONET, e) }}>{res.bankName}</td>
                  <td>{res.accountNumber}</td>
                  <td>
                    <div className="content">
                      {!payInThisAccount(res.accountNumber) ?
                        <button  
                          id={res.accountNumber} 
                          onClick={(e)=>changeViewComponetns( VIEW_PAYMENT_HERE_COMPONET,e)} 
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
                {viewDetailAccount && 
                 accountNumberState === res.accountNumber ? 
                  <tr>
                    <td colSpan="3" ><DetailsAccount /></td>
                  </tr> : null 
                }
                {viewPaymeHere &&
                 accountNumberState === res.accountNumber ? 
                  <tr>
                    <td  colSpan="3" className=''><PaymeHere /></td>
                  </tr> : null }
              </tbody>
            )
          })
        }
      </table>
    </div>
  )
}

export default AccountTable
