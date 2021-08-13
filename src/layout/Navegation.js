import { useAppContext } from '../context/AppProvider'
import React from 'react'
const Navegation = () => {
  const { userData } = useAppContext()
  const { name, lastname } = userData

  const navegationSyle = {
    logo: {
      marginLeft: '4rem',
      heigth: '40px',
      width: '40px'
    },
    logOut: {
      marginRight: '1rem'
    }
  }

  const logOut = () => {
    alert(`Bye ${name}`) // eslint-disable-line
  }

  return (
    <div className='ui secondary menu'>
      <img style={navegationSyle.logo} src='img/logo-navbar.png' />
      <div className='right menu'>
        <p className='ui item'>
          {name + ' ' + lastname}
        </p>
        <a style={navegationSyle.logOut} onClick={() => logOut()} className='ui item'>
          Logout
        </a>
      </div>
    </div>
  )
}

export default Navegation
