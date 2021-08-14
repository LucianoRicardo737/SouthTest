import React from 'react'
import { useAccountContext } from '../../context/AccountProvider'
import { useAppContext } from '../../context/AppProvider'

const PaymeHere = () => {
  const {userData} = useAppContext()
  const {
    salaryNotAssigned,  
    closeAllComponents, 
    sumbitSelectNewPaymentAccount, 
    handlerSelectedPaymentAccount
  }=useAccountContext()


  return (
    <div className='ui doubling stackable left '>
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
        <button onClick={()=>sumbitSelectNewPaymentAccount()} className="ui right  button">Submit</button>
        <button onClick={()=>closeAllComponents()} className="ui right  button">Close</button>
      </div>
    </div>
  )
}

export default PaymeHere
