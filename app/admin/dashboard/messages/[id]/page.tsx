import React from 'react'

export default function MessageDeatils({params}:any ) {

  const id = params.id
    return (
    <div className='flex w-screen h-screen justify-center items-center'> 
  <h1>  ID {id}</h1>
  </div>
  )  
}