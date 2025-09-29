"use client"

import React, { useState } from 'react'
import { MoveDown, LogOut } from "lucide-react";
import { usePrivy } from '@privy-io/react-auth';



const UserDetails = ({walletAddress, logout}) => {
    const [toggle, setToggle] = useState(false)
    // const { user } = usePrivy()

    function handleLogout() {
        setToggle(false)
        logout()
    }

    function shortAddress(address, chars = 3) {
        if (!address) return "";
        console.log(address.slice(0, chars + 2) + "..." + address.slice(-chars));
        let addressString = String(address.slice(0, chars + 2) + "..." + address.slice(-chars))
        
        return `${addressString}`;
    }
  return (
    <div className='flex items-start mb-10'>
        <div className=" flex items-center justify-between gap-5 relative rounded-md">
        <div className='bg-yellow-300 w-[30px] h-[30px] flex items-center justify-center rounded-full'>
            <span>
                C
            </span>
        </div>
        <button className='flex justify-between items-center px-1 border w-[150px] h-[37px] relative'>
            <span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 9.99791C19.0028 11.7847 18.4714 13.5315 17.474 15.0139C16.6514 16.2409 15.5391 17.2463 14.2356 17.9412C12.932 18.6361 11.4772 18.999 10 18.9979C8.52277 18.999 7.06804 18.6361 5.76444 17.9412C4.46085 17.2463 3.34858 16.2409 2.526 15.0139C1.74273 13.8463 1.2439 12.5115 1.06951 11.1164C0.895109 9.72124 1.05 8.30467 1.52175 6.9802C1.9935 5.65573 2.769 4.46021 3.78607 3.48947C4.80314 2.51873 6.0335 1.79978 7.37851 1.39025C8.72352 0.980724 10.1458 0.892009 11.5312 1.13122C12.9167 1.37043 14.2269 1.93091 15.3567 2.76773C16.4865 3.60455 17.4046 4.69444 18.0373 5.95002C18.67 7.20559 18.9997 8.59194 19 9.99791Z" stroke="black" strokeWidth="1.5"/>
                <path d="M11.2501 6.99805C11.2501 7.68805 10.6901 8.24805 10.0001 8.24805V9.74805C10.7294 9.74805 11.4289 9.45832 11.9446 8.94259C12.4603 8.42687 12.7501 7.72739 12.7501 6.99805H11.2501ZM10.0001 8.24805C9.31008 8.24805 8.75008 7.68805 8.75008 6.99805H7.25008C7.25008 7.72739 7.53981 8.42687 8.05553 8.94259C8.57126 9.45832 9.27073 9.74805 10.0001 9.74805V8.24805ZM8.75008 6.99805C8.75008 6.30805 9.31008 5.74805 10.0001 5.74805V4.24805C9.27073 4.24805 8.57126 4.53778 8.05553 5.0535C7.53981 5.56923 7.25008 6.2687 7.25008 6.99805H8.75008ZM10.0001 5.74805C10.6901 5.74805 11.2501 6.30805 11.2501 6.99805H12.7501C12.7501 6.2687 12.4603 5.56923 11.9446 5.0535C11.4289 4.53778 10.7294 4.24805 10.0001 4.24805V5.74805ZM3.16608 15.854L2.44708 15.64L2.33008 16.032L2.59708 16.342L3.16608 15.854ZM16.8341 15.854L17.4041 16.343L17.6701 16.033L17.5531 15.64L16.8341 15.854ZM7.00008 13.748H13.0001V12.248H7.00008V13.748ZM7.00008 12.248C5.9771 12.2478 4.98136 12.5778 4.16101 13.1889C3.34067 13.8001 2.73954 14.6598 2.44708 15.64L3.88508 16.068C4.08533 15.3975 4.49665 14.8095 5.05789 14.3915C5.61912 13.9735 6.30029 13.7479 7.00008 13.748V12.248ZM10.0001 18.248C8.80949 18.2494 7.63279 17.9924 6.55116 17.4949C5.46954 16.9973 4.50874 16.271 3.73508 15.366L2.59708 16.342C3.51154 17.411 4.64692 18.27 5.92497 18.8578C7.20301 19.4457 8.59333 19.7494 10.0001 19.748V18.248ZM13.0001 13.748C14.4701 13.748 15.7151 14.726 16.1151 16.068L17.5531 15.64C17.2606 14.6598 16.6595 13.8001 15.8391 13.1889C15.0188 12.5778 14.0231 12.2478 13.0001 12.248V13.748ZM16.2651 15.366C15.4914 16.271 14.5306 16.9973 13.449 17.4949C12.3674 17.9924 11.1907 18.2494 10.0001 18.248V19.748C11.4068 19.7494 12.7971 19.4457 14.0752 18.8578C15.3532 18.27 16.4896 17.412 17.4041 16.343L16.2651 15.366Z" fill="black"/>
                </svg>
            </span>
            <span className='text-[14px]'>{shortAddress(walletAddress)}</span>
            <span onClick={()=> setToggle(!toggle)}><MoveDown /></span>

            {
            toggle &&
            <ul className='w-full absolute bg-white border rounded-md text-left left-0 top-12 z-30'>
                <li className='w-full px-1 py-4 block text-[16px] font-black font-sans'>Profile</li>
                <li className='w-full px-1 flex gap-2 bg-[#F8F9FA] py-4 border-t text-[16px]
                    font-black font-sans' onClick={handleLogout}>
                    Disconnect <span><LogOut /></span>
                </li>
            </ul>
        }
        </button>

        
    </div>
    </div>
  )
}

export default UserDetails