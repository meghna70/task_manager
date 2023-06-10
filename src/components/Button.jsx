import React from 'react'

import {useStateContext} from '../contexts/ContextProvider'

const Button = ({icon,size,text,colour,bgCol,bgHoverCol,radius,width}) => {
  const{setIsClicked,initialState}=useStateContext();

  return (
      <button type='button' onClick={()=>setIsClicked(initialState)} className={`text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg=${bgHoverCol}`
      }style={{backgroundColor:bgCol,color:colour,borderRadius:radius}}>
      {icon}{text}
      </button>

  )
}

export default Button