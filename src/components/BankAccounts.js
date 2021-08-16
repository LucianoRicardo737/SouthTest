import React from 'react'
import { useAccountContext } from '../context/AccountProvider'
import AddNewAccount from './BankAccountComponents/AddNewAccount'
import AccountTable from './BankAccountComponents/AccountTable'
import General_message from '../context/env/General_message'
import { internationalString, localString } from '../context/env/env'
import { VIEW_NEW_ACCOUNT_COMPONET, VIEW_SELEC_TYPE_ACCOUNT_COMPONET } from '../context/actions/actionTypes'

const BankAccounts = () => {

  let {
    viewNewAccountOrDetailAccount, 
    changeViewComponetns, 
  } = useAccountContext()


  const BankAccount_style = {
    accounts: {
      padding: '20px 30px'
    },
    body: {
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
          <button onClick={() => changeViewComponetns(VIEW_SELEC_TYPE_ACCOUNT_COMPONET,localString)} className='active item local point'>
            Local
          </button>
          <button onClick={() => changeViewComponetns(VIEW_SELEC_TYPE_ACCOUNT_COMPONET,internationalString)} className='item international point'>
            International
          </button>
          <div style={BankAccount_style.buttonAddNewAccount} className='item right'><button onClick={() => changeViewComponetns(VIEW_NEW_ACCOUNT_COMPONET)} className='ui linkedin button point floting rig'>
            Add New Account
          </button>
          </div>
        </div>
        <div style={BankAccount_style.body} className=''>
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
