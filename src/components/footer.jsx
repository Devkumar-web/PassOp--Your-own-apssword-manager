import React from 'react'

const footer = () => {
  return (
    <div className="bg-[#244855] w-screen text-white flex flex-col justify-center items-center py-1 gap-1 ">
        <div className='logo font-bold  '>
      <span className='text-[#874f41]'>&lt;</span>
      Pass
      <span className='text-[#874f41]'>OP/&gt;</span>

    </div>
        
        <div className='text-center flex justify-center items-center gap-1'>
      Created With<img className='w-8' src='heart.png'></img>By Dev
      </div>
    </div>
  )
}

export default footer
