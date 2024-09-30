import React from 'react'

export const Navbar = () => {
  return (
    <>
   <div className='flex border border-red-1000 items-center'>
      <div className='border w-1/5'>
        <img className='w-[60%]' src='https://mma.prnewswire.com/media/2090028/Dell_Technologies_Logo.jpg?p=facebook'/>
      </div> 
      <div className=' ml-[10%]'>
        <input className="border" type='text' placeholder="Search"/>
      </div>
      <div className='flex  border ml-[35%]'>
        <div className='ml-[20px]'>
            <p>Sign In</p>
        </div>
        <div className='ml-[20px]'>
            <p>Contact Us</p>
        </div>
        <div className='ml-[20px]'>
            <p>IN/EN</p>
        </div>
        <div className='ml-[20px]'>
            <p>Cart</p>
        </div>
      </div>
   </div>
    </>
  )
}
