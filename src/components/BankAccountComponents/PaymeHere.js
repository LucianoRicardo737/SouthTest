import React from 'react'
import { useAccountContext } from '../../context/AccountProvider'
import { useAppContext } from '../../context/AppProvider'

const PaymeHere = () => {
  const {userData} = useAppContext()
  const {
    salaryNotAssigned,  
    closeAllViews, 
    sumbitSelectNewPaymentAccount, 
    handlerSelectedPaymentAccount
  }=useAccountContext()

  const paymeHereStyle = {
    cont:{
      border: '1px solid rgb(237,237,238)',
      padding: '20px',
      borderRadius: '5px'
    }
  }

  return (
    <div style={paymeHereStyle.cont} className='ui doubling stackable left '>
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
              onChange={handlerSelectedPaymentAccount}
              defaultValue='300'
              min='300'
              max={salaryNotAssigned()} 
              type='number' 
              name='pay'/>
          </div>
        </div>
      </div>
      <div className='container'>
        <button onClick={()=>sumbitSelectNewPaymentAccount()} className="ui right  button">Submit</button>
        <button onClick={()=>closeAllViews()} className="ui right  button">Close</button>
      </div>
    </div>
  )
}

export default PaymeHere
