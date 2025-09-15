"use client"

import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { useRouter } from 'next/navigation';
import DeleteAccountDialog from '@/components/ResetPassword';
import ProtectedRoute from '@/lib/withAuth';
import { useAccount } from 'wagmi';
// import { usePrivy } from '@privy-io/react-auth';


const Account = () => {

  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { address, isConnected } = useAccount()



  async function deleteAccount() {

    if(user) {
      try {
        await deleteUser(user)
        console.log("Account deleted from firebase auth");
        router.push("/?route=login")
      } catch (error) {
        console.error("Error deleting User", error)
        if(error.code === "auth/requires-recent-login") {
          alert("Please log in again to delete your account.")
        }
      }
    }
  }


  return (
    <ProtectedRoute>
      <div className={`h-screen font-sans ${open ? "bg-black/60" : "bg-white"} `} >
        <Sidebar />
        <main className='md:ml-64 px-10 py-[7.8rem]  md:w-3/4 w-full'>
            <h1 className='text-[20px] font-semibold'>Login Information</h1>
            <p className='text-[16px] text-black/60 mt-3'>Manage the wallet address you use to login.</p>
            <div className='md:w-md items-center justify-between mt-20 space-y-4'>
              <p className='text-[16px] font-semibold'>Wallet</p>
              <p className='text-[#00000099] wrap-break-word'>{address}</p>
            </div>

            <hr className='mt-14'/>


            {/* <div className='mt-16'>
              <h2 className='text-[20px]'>Delete account</h2>

              <div className='border-[#FF0000] items-center border mt-10 text-[#FF0000]
                p-5 rounded-md flex flex-wrap justify-between'>
                <div className='mb-5 md:mb-0'>
                  <p>Delete your account</p>
                  <span className='text-[14px]'>Delete and close your account.</span>
                </div>

                <button className='bg-[#DC2828] h-[39px] text-white rounded-full w-[8.85rem] cursor-pointer'
                  onClick={() => setOpen(true)}>
                    Delete account
                </button>

              </div>
            </div> */}

            {/* <ResetPassword open={open} setOpen={() => setOpen(!open)}/> */}
            {/* <DeleteAccountDialog open={open} setOpen={() => setOpen(!open)}
              deleteAccount={deleteAccount}/> */}
        </main>
    </div>
    </ProtectedRoute>
  )
}

export default Account


