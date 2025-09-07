import React from 'react'

const DiscoverBox = () => {

    const dicoverData = [
        {
            icon: <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.43067 2H16.1852C16.7227 2 17.2381 2.21349 17.6181 2.59351C17.9981 2.97353 18.2116 3.48895 18.2116 4.02637C18.2116 5.28037 17.7135 6.48301 16.8268 7.36972C15.94 8.25643 14.7374 8.75458 13.4834 8.75458H12.1325C10.8785 8.75458 9.67587 8.25643 8.78916 7.36972C7.90245 6.48301 7.4043 5.28037 7.4043 4.02637C7.4043 3.48895 7.61779 2.97353 7.99781 2.59351C8.37783 2.21349 8.89324 2 9.43067 2Z" stroke="#00CD5D" strokeWidth="3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13.4828 26.3157H7.40366C5.97052 26.3157 4.59608 25.7464 3.5827 24.733C2.56931 23.7196 2 22.3452 2 20.912V19.5611C1.99917 17.1801 2.78463 14.8655 4.23437 12.9768C5.68412 11.0881 7.71699 9.73105 10.0172 9.11637C12.3175 8.50168 14.7563 8.66382 16.955 9.57759C19.1536 10.4914 20.9889 12.1056 22.1759 14.1696M18.211 23.6138H26.3165M22.2637 19.5611V27.6666" stroke="#00CD5D" strokeWidth="3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

,
            title: "Opportunities",
            desc: "Discover grants, bounties and paid gigs on ClearFund helping builders and creators access the support they need."
        },

        {
            icon: <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.7109 25.75C10.4506 25.75 7.60987 24.6694 5.18872 22.5081C2.76757 20.3468 1.37933 17.6474 1.024 14.4097H3.92995C4.2607 16.8668 5.35362 18.8986 7.2087 20.5051C9.06378 22.1117 11.2312 22.9149 13.7109 22.9149C16.4751 22.9149 18.8202 21.9524 20.7462 20.0274C22.6721 18.1024 23.6346 15.7573 23.6337 12.9922C23.6327 10.227 22.6702 7.88244 20.7462 5.95838C18.8221 4.03431 16.477 3.07133 13.7109 3.06944C12.0808 3.06944 10.5569 3.44745 9.13938 4.20347C7.72185 4.95949 6.52876 5.99901 5.56011 7.32205H9.45833V10.1571H0.953125V1.65191H3.78819V4.98311C4.9931 3.47108 6.46403 2.30161 8.20098 1.47472C9.93793 0.647822 11.7746 0.234375 13.7109 0.234375C15.4829 0.234375 17.1428 0.571276 18.6907 1.24508C20.2387 1.91888 21.5853 2.82799 22.7307 3.97241C23.8761 5.11684 24.7857 6.46349 25.4595 8.01239C26.1333 9.56128 26.4697 11.2212 26.4687 12.9922C26.4678 14.7632 26.1314 16.4231 25.4595 17.972C24.7875 19.5209 23.878 20.8675 22.7307 22.012C21.5834 23.1564 20.2368 24.066 18.6907 24.7407C17.1447 25.4155 15.4847 25.7519 13.7109 25.75ZM17.68 18.9458L12.2934 13.5592V5.90451H15.1285V12.4252L19.6646 16.9613L17.68 18.9458Z" fill="#00CD5D"/>
                </svg>
,
            title: "Data Portal",
            desc: "Access past funding data through an open directory of funded projects and an interactive dashboard that highlights funding flows."
        },

        {
            icon: <svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5625 10.3885C9.5625 7.38315 12.111 4.41262 13.9003 2.69746C14.3581 2.25032 14.9726 2 15.6125 2C16.2523 2 16.8668 2.25032 17.3246 2.69746C19.1139 4.41262 21.6624 7.38315 21.6624 10.3885C21.6624 13.3363 19.371 16.3673 15.6125 16.3673C11.8539 16.3673 9.5625 13.3363 9.5625 10.3885Z" stroke="#00CD5D" strokeWidth="2.5"/>
                    <path d="M2 20.1484H5.62241C6.06708 20.1484 6.5057 20.2483 6.90349 20.4419L9.99199 21.9362C10.3898 22.1283 10.8284 22.2281 11.2746 22.2281H12.8506C14.3752 22.2281 15.6124 23.4245 15.6124 24.9007C15.6124 24.9612 15.5716 25.0126 15.5126 25.0292L11.6693 26.0925C10.9797 26.283 10.2444 26.2164 9.60026 25.905L6.29849 24.3078" stroke="#00CD5D" strokeWidth="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15.6124 23.9293L22.5593 21.7952C23.164 21.6096 23.812 21.6198 24.4106 21.8243C25.0093 22.0288 25.528 22.4172 25.8928 22.9341C26.4509 23.7054 26.224 24.8126 25.4103 25.2815L14.0439 31.8411C13.6885 32.0468 13.295 32.1779 12.8873 32.2265C12.4795 32.2751 12.0662 32.2402 11.6724 32.124L2 29.2532" stroke="#00CD5D" strokeWidth="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

,
            title: "GoodCollective",
            desc: "Support GoodDollar initiative on ClearFund your donation provides direct digital payments to people who need it most.",
        },

        {
            icon: <svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.2059 31.6733V25.1737H24.2612V19.3963H27.8721C25.7055 10.7301 23.539 1.3418 13.4285 1.3418C10.8841 1.34081 8.41042 2.17971 6.3915 3.72831C4.37257 5.27691 2.92125 7.4486 2.26278 9.90637C1.6043 12.3641 1.77548 14.9705 2.74977 17.3211C3.72405 19.6716 5.44694 21.6348 7.65107 22.906V31.6733" stroke="#00CD5D" strokeWidth="2.5"/>
                    <path d="M15.3638 6.77148L16.083 9.01746L18.3868 8.51627L20.1922 11.6419L18.6728 13.3866L20.1908 15.1314L18.3868 18.257L16.083 17.7558L15.3652 20.0018H11.7558L11.0379 17.7558L8.73416 18.257L6.92871 15.1314L8.44817 13.3866L6.92871 11.6419L8.73416 8.51627L11.0379 9.01746L11.7558 6.77148H15.3638Z" stroke="#00CD5D" strokeWidth="2.5"/>
                    <path d="M13.564 14.3135C13.8099 14.3135 14.0458 14.2158 14.2197 14.0419C14.3936 13.868 14.4913 13.6322 14.4913 13.3863C14.4913 13.1403 14.3936 12.9045 14.2197 12.7306C14.0458 12.5567 13.8099 12.459 13.564 12.459M13.564 14.3135C13.3181 14.3135 13.0822 14.2158 12.9083 14.0419C12.7344 13.868 12.6367 13.6322 12.6367 13.3863C12.6367 13.1403 12.7344 12.9045 12.9083 12.7306C13.0822 12.5567 13.3181 12.459 13.564 12.459" stroke="#00CD5D" strokeWidth="2.5"/>
                </svg>
,
            title: "Informed decisions",
            desc: "Use reliable data on ClearFund to make smarter decisions whether you're funding, building, or researching."
        }
    ]

    
  return (

    <div className="bg-black px-[5%] lg:px-[10%] pt-[4rem] md:pb-[9rem] pb-[5rem] space-y-20
        flex flex-col items-center justify-center">
        <header className="capitalize mt-5 text-[45px] font-extrabold  text-white text-center">
            Why ClearFund Matters
        </header>
        <div className="h-full grid lg:grid-cols-2 gap-10 xl:w-[63rem] lg:w-[62rem] w-full  text-white mb-10 md:mb-0">
            {dicoverData.map((item, index) => (
                <div className="bg-[#111111] w-full md:w-[474px] px-10 py-10 h-[229px]
                     rounded-md hover:scale-105 pt-8 pb-8 lg:pb-0 mx-auto font-sans
                    transition duration-300 ease-in-out hover:shadow-[#00CD5D] hover:shadow-2xl" key={index}>

                    <span className='block mb-1'>{item.icon}</span>


                    <h3 className="text-[22px] font-semibold mb-5">{item.title}</h3>
                    <p className='text-[16px]'>{item.desc}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default DiscoverBox