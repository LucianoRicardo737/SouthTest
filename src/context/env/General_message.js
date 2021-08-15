import React from 'react'
import { useAccountContext } from '../AccountProvider'

const General_message = () => {
  let {
    errorMessage,
    successMessage,
    clearMessages
  } = useAccountContext()

  let message = false

  if(successMessage || errorMessage){
    message = true
  }

  return (
    message &&
        <div className={ errorMessage ? 'ui negative message animating transition bounce' : 'ui positive message animating transition bounce' }>
          <i onClick={()=>clearMessages()} className="close icon"></i>
          <div className="header">
            {errorMessage ? errorMessage : successMessage}
          </div>
        </div>
  )
}

export default General_message
