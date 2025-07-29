import React from 'react'
import Sidebar from '@/components/Sidebar'

const page = () => {
  return (
    <div>
        <Sidebar />
        <main className='md:ml-64 px-10 md:mt-[7.8rem] w-3/4'>
            <h1 className='text-[20px] font-semibold'>Login Information</h1>
            <div className='flex md:w-md items-center justify-between mt-20'>
              <span className='text-[16px]'>Email</span> <span className='text-[#00000099]'>phweb3connect@gmail.com</span>
            </div>

            <hr className='mt-16'/>

            <div className='mt-16'>
              <h2 className='text-[20px]'>Delete account</h2>

              <div className='border-[#FF0000] border-2 mt-10 text-[#FF0000] p-5 rounded-md flex justify-between'>
                <div>
                  <p>Delete your account</p>
                  <span className='text-[14px]'>Delete and close your account.</span>
                </div>

                <button className='bg-[#DC2828] text-white rounded-full w-[8.85rem]'>Delete account</button>
              </div>
            </div>
        </main>
    </div>
  )
}

export default page