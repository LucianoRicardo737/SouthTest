import React from 'react'
import { useAccountContext } from '../../context/AccountProvider'
import { useAppContext } from '../../context/AppProvider'

const PaymeHere = () => {
  const {userData} = useAppContext()
  const {
    salaryNotAssigned,  
    fadeOut, 
    submitNewPayment, 
    handlerSelectedPaymentAccount
  }=useAccountContext()


  return (
    <div id='payhereComponent' className='ui doubling stackable left transition animating in fade down'>
      <div className="ui mini form ">
        <div className="three fields">
          <div className="field">
            <span>Monthly Salary:{userData.monthlySalary}</span>
          </div>
          <div className="field">
            <span>To Select:{salaryNotAssigned()}</span>
          </div>
          <div className="field">
            <input
              onChange={(handlerSelectedPaymentAccount)}
              defaultValue='0'
              min='300'
              max={salaryNotAssigned()} 
              type='number' 
              name='pay'/>
          </div>
        </div>
      </div>
      <div className='container'>
        <button onClick={()=>submitNewPayment()} className="ui right  button">Submit</button>
        <button onClick={()=>fadeOut('payhereComponent')} className="ui right  button">Close</button>
      </div>
    </div>
  )
}

export default PaymeHere
