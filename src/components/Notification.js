import React from 'react';
import './Notification.style.css'

export  const Notification = ({message,error})=>{
    return(
      <div className='message'>
        {error==null?(<></>)
        :error==true?(
          <h3 className='error'>{message}</h3>
        ):(
          <h3 className='success'>{message}</h3>
        )}
      </div>
    )
  }
export default Notification