"use client"

import Image from 'next/image';
import { useState } from 'react';
import NavHeader from "@/components/navHeader";
import Footer from "@/components/Footer";
import MenuDropdown from "@/components/menuDropdown";
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-white text-black">
      <NavHeader />




      <div className='w-full text-white mt-4 md:mt-8' style={{
        backgroundImage: "url(/support-bg.svg)",
        backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"
      }}>
        <div className='py-[8rem] lg:py-[12rem] lg:px-[10%] bg-black/75 min-h-[80vh] flex items-center'>
          <div className='w-full py-5 px-5 lg:px-0 flex flex-col gap-10 lg:gap-16'>
            <div className='flex gap-5'>
              {/* <li className='bg-white w-5 h-5 rounded-full p-5'> */}
              <Link href={"https://x.com/Clear_Fund"} target='_blank'>
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="19" cy="19" r="19" fill="white" />
                  <path d="M26.5641 25.8391L21.4466 17.8021L26.4567 12.2912C26.6325 12.093 26.7232 11.8335 26.7089 11.569C26.6947 11.3045 26.5768 11.0562 26.3807 10.878C26.1847 10.6999 25.9263 10.6062 25.6616 10.6172C25.397 10.6283 25.1473 10.7432 24.9668 10.9371L20.33 16.0412L17.1681 11.0739C17.0772 10.931 16.9518 10.8133 16.8034 10.7318C16.655 10.6503 16.4884 10.6075 16.3191 10.6074H12.2922C12.1118 10.6075 11.9348 10.656 11.7797 10.7479C11.6245 10.8398 11.4969 10.9717 11.4101 11.1298C11.3233 11.2879 11.2806 11.4664 11.2865 11.6466C11.2923 11.8269 11.3464 12.0022 11.4432 12.1544L16.5607 20.1914L11.5472 25.7024C11.4564 25.7999 11.3859 25.9144 11.3397 26.0394C11.2936 26.1644 11.2727 26.2972 11.2782 26.4303C11.2838 26.5634 11.3157 26.6941 11.3721 26.8148C11.4286 26.9355 11.5084 27.0437 11.607 27.1333C11.7056 27.2229 11.821 27.2921 11.9465 27.3367C12.072 27.3814 12.2051 27.4007 12.3381 27.3936C12.4712 27.3864 12.6015 27.3529 12.7214 27.2951C12.8414 27.2372 12.9487 27.1561 13.0372 27.0564L17.6773 21.9523L20.8392 26.9197C20.9301 27.0625 21.0556 27.1802 21.204 27.2617C21.3524 27.3432 21.5189 27.386 21.6882 27.3861H25.7151C25.8955 27.386 26.0725 27.3375 26.2276 27.2456C26.3828 27.1537 26.5104 27.0218 26.5972 26.8637C26.684 26.7056 26.7267 26.5271 26.7209 26.3469C26.715 26.1666 26.6609 25.9913 26.5641 25.8391ZM22.2411 25.3727L14.1261 12.6209H15.7662L23.8812 25.3727H22.2411Z" fill="black" />
                </svg>
              </Link>

              <Link href={"https://t.me/+fU2kPPjZ50MxMTE0"} target='_blank'>
                <svg width="38" height="37" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="19" cy="18.5" rx="19" ry="18.5" fill="white" />
                  <path d="M24.9722 9.63393L5.87636 17.0358C5.10791 17.3805 4.848 18.0708 5.69062 18.4454L10.5895 20.0103L22.4345 12.652C23.0812 12.1901 23.7434 12.3133 23.1736 12.8214L13.0004 22.0802L12.6808 25.9985C12.9768 26.6035 13.5188 26.6063 13.8645 26.3056L16.6791 23.6286L21.4995 27.2569C22.619 27.9232 23.2282 27.4932 23.4691 26.2721L26.6309 11.2234C26.9592 9.72031 26.3993 9.05803 24.9722 9.63393Z" fill="black" />
                </svg>
              </Link>


              <Link href={"https://discord.gg/4ePswVpuvd"} target='_blank'>
                <svg width="38" height="37" viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="19" cy="18.5" rx="19" ry="18.5" fill="white" />
                  <path d="M26.5937 7.11328C27.8607 7.11328 28.8954 8.13912 28.917 9.41887V29.8845L26.4804 27.7212L25.109 26.446L23.6584 25.0912L24.2591 27.1975H11.4073C10.7964 27.1961 10.2106 26.9536 9.77601 26.5223C9.34143 26.0911 9.0929 25.5055 9.08398 24.8919V9.45872C9.08398 8.17442 10.1051 7.13491 11.3676 7.11328H26.5937ZM17.3798 12.5556L17.2665 12.419H17.2019C16.8925 12.4292 15.5178 12.5328 14.0819 13.6145L14.0275 13.7192C13.743 14.2771 12.4499 16.9892 12.4499 20.2523L12.4726 20.2898C12.6335 20.5369 13.6274 21.91 15.9065 21.9829L16.2409 21.5719L16.6659 21.0379C15.3444 20.6405 14.7778 19.8413 14.6939 19.7126L14.6826 19.6944L14.729 19.7251C14.7819 19.7608 14.8722 19.8151 14.9999 19.8879C15.0112 19.8993 15.0226 19.9107 15.0452 19.9221C15.0792 19.9449 15.1132 19.9562 15.1472 19.979C15.4305 20.1384 15.7139 20.2637 15.9745 20.3661C16.4392 20.5483 16.9945 20.7305 17.6405 20.8557C18.4667 21.0106 19.4311 21.0686 20.4829 20.8842L20.5758 20.8671C21.1084 20.776 21.6524 20.6166 22.2191 20.3775C22.6158 20.2295 23.0577 20.0132 23.5224 19.7058L23.5043 19.7342C23.3955 19.8936 22.8016 20.6827 21.4711 21.0607L21.6581 21.2963C21.9448 21.6538 22.2191 21.9829 22.2191 21.9829C24.7237 21.9032 25.687 20.2523 25.687 20.2523C25.687 16.5861 24.0551 13.6145 24.0551 13.6145C22.652 12.5567 21.3068 12.4338 20.9577 12.4201L20.8705 12.419L20.7118 12.6011C22.4208 13.126 23.3184 13.857 23.4997 14.0164L23.5337 14.0471C21.7972 13.0848 19.7985 12.7095 17.8332 12.9769C17.7652 12.9769 17.7085 12.9883 17.6405 12.9996L17.577 13.0053C17.1464 13.0497 16.2205 13.2091 15.0679 13.7169L14.9036 13.7944C14.6973 13.8923 14.5477 13.9686 14.4672 14.0107L14.3992 14.0471C14.3992 14.0471 15.3206 13.1659 17.3186 12.5738L17.3798 12.5556ZM16.9492 16.6658C17.5952 16.6658 18.1165 17.2351 18.1052 17.9296C18.1052 18.6241 17.5952 19.1934 16.9492 19.1934C16.3145 19.1934 15.7932 18.6241 15.7932 17.9296C15.7932 17.2351 16.3032 16.6658 16.9492 16.6658ZM21.0858 16.6658C21.7318 16.6658 22.2418 17.2351 22.2418 17.9296C22.2418 18.6241 21.7318 19.1934 21.0858 19.1934C20.4511 19.1934 19.9298 18.6241 19.9298 17.9296C19.9298 17.2351 20.4398 16.6658 21.0858 16.6658Z" fill="black" />
                </svg>
              </Link>

            </div>

            <div>
              <h1 className='lg:text-[96px] text-[43px] leading-16 lg:leading-[90px] font-bold'>
                About<br />ClearFund
              </h1>

              <div className='space-y-6 mt-10 md:mt-16 w-full pb-10 font-sans font-normal text-[17px] text-white leading-relaxed'>
                <p>
                  Web3 is full of opportunity but finding the right funding at the right time remains one of the biggest challenges for builders. ClearFund exists to change that. By centralizing, curating, and clarifying the Web3 funding landscape, ClearFund transforms a fragmented ecosystem into a navigable one.
                </p>

                <p>
                  At its core, ClearFund is a grant aggregator. Developers, founders, and community builders can explore funding opportunities across leading platforms like Gitcoin, Giveth and other web3 platforms. Studying how past rounds were distributed, which projects received support, and what impact those investments created. This transparency helps builders identify the right opportunities, craft stronger applications, and approach funders with confidence.
                </p>

                <p>
                  But ClearFund is more than a directory. Building on that foundation, we introduced GoodCollective a feature built on top of GoodDollar that takes funding a step further. Through GoodCollective, users can directly contribute to existing community pools, putting resources behind the causes and communities they believe in. Whether you are a developer, tipper, or community member, GoodCollective makes participation simple, transparent, and on-chain.
                </p>
              </div>
            </div>



          </div>
        </div>

        {/* <div className='absolute'></div> */}
      </div>
      <Footer />
    </div>
  );
}
