import React from 'react'
import { useAccountContext } from '../context/AccountProvider'
import AddNewAccount from './BankAccountComponents/AddNewAccount'
import AccountTable from './BankAccountComponents/AccountTable'
import General_message from '../context/env/General_message'

const BankAccounts = () => {

  let {
    viewNewAccountOrDetailAccount, 
    changeViewComponetns, 
  } = useAccountContext()


  const BankAccount_style = {
    accounts: {
      padding: '20px 30px'
    },
    details: {
      marginBottom: '5px'
    },
    buttonAddNewAccount:{
      marginRight: '-7px'
    }
  }
  

  return (
    <div className='ui doubling stackable grid'>
      <div style={BankAccount_style.accounts} className='sixteen wide column'>
        <div className='ui secondary menu'>
          <button onClick={() => changeViewComponetns('typeAccount','local')} className='active item local point'>
            Local
          </button>
          <button onClick={() => changeViewComponetns('typeAccount','international')} className='item international point'>
            International
          </button>
          <div style={BankAccount_style.buttonAddNewAccount} className='item right'><button onClick={() => changeViewComponetns('viewNewAccountComponetn')} className='ui linkedin button point floting rig'>
            Add New Account
          </button>
          </div>
        </div>
        <div style={BankAccount_style.details} className=''>
          <General_message  />
          {viewNewAccountOrDetailAccount && <AddNewAccount />}
        </div>
        <div>
          <AccountTable />
        </div>
      </div>
    </div>
  )
}

export default BankAccounts
