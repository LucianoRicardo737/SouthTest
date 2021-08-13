import React from 'react'

const SideLeftNavegation = () => {
  const myStyle = {
    cont: {
      width: '100%'
    }
  }

  return (
    <div style={myStyle.cont} className='ui secondary vertical pointing menu'>
      <a className='item'>
        Home
      </a>
      <a className='item'>
        My Profile
      </a>
      <a className='item'>
        My Team
      </a>
      <a className='item'>
        My Documents
      </a>
      <a className='item active'>
        Bank Accounts
      </a>
      <a className='item'>
        My Time Off
      </a>
      <a className='item'>
        Referal Program
      </a>
    </div>
  )
}

export default SideLeftNavegation
