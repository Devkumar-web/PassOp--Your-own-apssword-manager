import React from 'react'

const navbar = () => {
  return (
   <nav className='bg-[#244855] text-white'>
    <div className='mycontainer flex justify-between items-center py-3'>
    <div className='logo font-bold  '>
      <span className='text-[#874f41]'>&lt;</span>
      Pass
      <span className='text-[#874f41]'>OP/&gt;</span>

    </div>
    <ul>
        {/* <li className='flex space-x-5'>
            <a className='hover:font-bold' href='#'>Home</a>   
            <a className='hover:font-bold' href='#'>About</a>
            <a  className='hover:font-bold' href='#'>Services</a> 
        </li> */}
    </ul>
    <button className='bg-[#c6a16c] px-4 py-2 rounded-full gap-2 flex justify-between items-center ring-amber-400 ring-1'>
    <img src='github.png' className='w-6' alt="github">
    </img>
    <span className='text-bold'>GitHub</span>
   
    </button>
    </div>

   </nav>
  )
}

export default navbar
