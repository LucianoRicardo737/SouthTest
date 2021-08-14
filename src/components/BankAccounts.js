import React from 'react'
import { useAccountContext } from '../context/AccountProvider'
import AddNewAccount from './BankAccountComponents/AddNewAccount'
import DetailsAccount from './BankAccountComponents/DetailsAccount' 
import AccountTable from './BankAccountComponents/AccountTable'
import PaymeHere from './BankAccountComponents/PaymeHere'

const BankAccounts = () => {

  let {
    viewNewAccountOrDetailAccount, 
    viewDetailAccount, 
    changeViewComponetns, 
    viewPaymeHere,
    errorMessage,
    setErrorMessage
  } = useAccountContext()


  const BankAccountStyle = {
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
      <div style={BankAccountStyle.accounts} className='sixteen wide column'>
        <div className='ui secondary menu'>
          <button onClick={() => changeViewComponetns('typeAccount','local')} className='active item local point'>
            Local
          </button>
          <button onClick={() => changeViewComponetns('typeAccount','international')} className='item international point'>
            International
          </button>
          <div style={BankAccountStyle.buttonAddNewAccount} className='item right'><button onClick={() => changeViewComponetns('viewNewAccountComponetn')} className='ui linkedin button point floting rig'>
            Add New Account
          </button>
          </div>
        </div>
        <div style={BankAccountStyle.details} className=''>
          {errorMessage&&
            <div className="ui negative message">
              <i onClick={()=>setErrorMessage('')} className="close icon"></i>
              <div className="header">
                {errorMessage}
              </div>
            </div>}
          {viewPaymeHere &&<PaymeHere />}
          {viewNewAccountOrDetailAccount && <AddNewAccount />}
          {viewDetailAccount &&<DetailsAccount/>}
        </div>
        <div>
          <AccountTable />
        </div>
      </div>
    </div>
  )
}

export default BankAccounts
