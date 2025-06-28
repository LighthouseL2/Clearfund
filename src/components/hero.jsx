import React from 'react'

const HeroSection = ({toggle, setToggle}) => {
  return (
    <div className="px-[5%] h-[80vh] flex justify-center items-center md:w-[85%] mx-auto text-center flex-col space-y-10">
        <h1 className="capitalize text-3xl md:text-6xl font-extrabold tracking-wide ">Track Previous grants. explore new ones. get real-time Alerts.</h1>
        <p className="text-xl md:w-[60%]">
            Explore past grants data, find new funding oppourtunities and stay updated with real-time
            alerts from Web3 grants platforms
        </p>

        <button className="bg-green-500 font-semibold text-black px-5 py-3 rounded-md" onClick={() =>setToggle(!toggle)}>
          Get started
        </button>
    </div>
  )
}

export default HeroSection