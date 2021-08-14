import BankAccounts from './components/BankAccounts'
import { AppProvider } from './context/AppProvider'
import Navegation from './layout/Navegation'
import SideLeftNavegation from './layout/SideLeftNavegation'
import React from 'react'

import './app.css'
import { AccountProvider } from './context/AccountProvider'

const appStyle = {
  nav: {
    height: '60px',
    gridColumn: '1/ span 16 ',
    padding: '10px',
    borderBottom: '1px solid rgb(237,237,238)'
  }
}

function App () {
  return (
    <div className='App ui grid padded'>
      <AppProvider>
        <div style={appStyle.nav} className='sixteen wide column'>
          <Navegation />
        </div>
        <div className='four wide column'>
          <SideLeftNavegation />
        </div>
        <div className='twelve wide column'>
          <AccountProvider>
            <BankAccounts />
          </AccountProvider>
        </div>
      </AppProvider>
    </div>
  )
}

export default App
