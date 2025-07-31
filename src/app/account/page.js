"use client"

import React, { useEffect, useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, deleteUser, logout } from '@/features/user/userSlice';
import { useRouter } from 'next/navigation';
import { Dialog, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogContent } from '@radix-ui/react-dialog';
import LoginForm from '@/components/LoginForm';
import ResetPassword from '@/components/ResetPassword';
import DeleteAccountDialog from '@/components/ResetPassword';


const Acount = () => {

  const dispatch = useDispatch()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const { user } = useSelector((state) => state.user)


  useEffect(() => {
    dispatch(checkAuth())

  }, [dispatch])
  console.log(user);


  function deleteAccount() {
    dispatch(deleteUser()).then(() => {
      dispatch(logout())
      router.push("/?route=login")
    })
  }
  return (
    <div className={`h-screen ${open ? "bg-black/60" : "bg-white"} `} >
        <Sidebar />
        <main className='md:ml-64 px-10 py-[7.8rem]  md:w-3/4 w-full'>
            <h1 className='text-[20px] font-semibold'>Login Information</h1>
            <div className='flex md:w-md items-center justify-between mt-20'>
              <span className='text-[16px]'>Email</span> <span className='text-[#00000099]'>{user ? user.email : "phweb3connect@gmail.com"}</span>
            </div>

            <hr className='mt-16'/>


            <div className='mt-16'>
              <h2 className='text-[20px]'>Delete account</h2>

              <div className='border-[#FF0000] items-center border mt-10 text-[#FF0000]
                p-5 rounded-md flex flex-wrap justify-between'>
                <div className='mb-5 md:mb-0'>
                  <p>Delete your account</p>
                  <span className='text-[14px]'>Delete and close your account.</span>
                </div>

                <button className='bg-[#DC2828] h-[39px] text-white rounded-full w-[8.85rem]'
                  onClick={() => setOpen(true)}>
                    Delete account
                </button>

              </div>
            </div>

            {/* <ResetPassword open={open} setOpen={() => setOpen(!open)}/> */}
            <DeleteAccountDialog open={open} setOpen={() => setOpen(!open)}
              deleteAccount={deleteAccount}/>
        </main>
    </div>
  )
}

export default Acount


