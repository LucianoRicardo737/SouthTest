import React from 'react'
import { useAccountContext } from '../context/AccountProvider'
import AddNewAccount from './BankAccountComponents/AddNewAccount'
import DetailsAccount from './BankAccountComponents/DetailsAccount' // eslint-disable-line
import AccountTable from './BankAccountComponents/AccountTable'
import PaymeHere from './BankAccountComponents/PaymeHere'

const BankAccounts = () => {

  let {
    viewNewAccountOrDetailAccount, 
    changeTypeAccount, 
    viewDetailAccount, 
    viewNewAccountComponetn, 
    viewPaymeHere,
    errorMessage,
    setErrorMessage
  } = useAccountContext()


  const myStyle = {
    accounts: {
      padding: '10px'
    },
    details: {
      marginBottom: '5px'
    }
  }

  return (
    <div className='ui doubling stackable grid padded'>
      <div style={myStyle.accounts} className='sixteen wide column'>
        <div className='ui secondary menu'>
          <button onClick={() => changeTypeAccount('local')} className='active item local point'>
            Local
          </button>
          <button onClick={() => changeTypeAccount('international')} className='item international point'>
            International
          </button>
          <div className='item right'><button onClick={() => viewNewAccountComponetn()} className='ui linkedin button point'>
            Add New Account
          </button>
          </div>
        </div>
        <div style={myStyle.details} className=''>
          {errorMessage&&
            <div className="ui negative message">
              <i onClick={()=>setErrorMessage('')} className="close icon"></i>
              <div className="header">
                {errorMessage}
              </div>
            </div>
          }
          {viewPaymeHere &&<PaymeHere />}
          {viewNewAccountOrDetailAccount && <AddNewAccount />}
          {viewDetailAccount &&<DetailsAccount/>}
        </div>
        <div style={myStyle.local}>
          <AccountTable />
        </div>
      </div>
    </div>
  )
}

export default BankAccounts
