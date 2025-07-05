
import Image from "next/image";


const StatSection = () => {
  return (
    <div className="flex justify-center items-center overflow-hidden scale-90">
        <div className="px-[5%] h-[50vh] lg:h-[90vh] relative w-full flex  flex-col gap-10">
            <div className="md:w-2/3  h-full relative ">
                <Image
                    fill
                    src={"/statImg.png"}
                    alt=""
                    className="object-contain top-0"
                />
            </div>
            <div className="flex flex-wrap md:w-2/3 lg:w-2/3 items-center justify-center
                text-white absolute gap-5   md:top-[13%] lg:h-[45vh] md:-right-10 lg:top-[22%] lg:-right-20 w-full">
                <div className="w-[33%] space-y-3 bg-black py-3 rounded-md right-1/2 lg:h-40  flex flex-col items-center justify-center">
                    <h2 className="font-semibold text-[25px]  lg:text-[45px]">10+</h2>
                    <p className="font-semibold text-[14px] lg:text-[16px]">Grant rounds explored</p>
                </div>
                <div className="w-[33%] space-y-3 py-3 bg-black rounded-md lg:h-40 flex flex-col items-center justify-center">
                    <h2 className="font-semibold  lg:text-[45px] text-[25px]">15+</h2>
                    <p className="font-semibold lg:text-[16px] text-[14px]">Funds tracked</p>
                </div>
                <div className="flex items-center py-3 justify-center flex-col w-[33%] bg-black rounded-md lg:h-40">
                    <h2 className="text-[25px] lg:text-[45px] font-semibold ">98%</h2>
                    <p className="font-semibold text-[14px] lg:text-[16px]">Alerts sent</p>
                </div>
                <div className="flex items-center py-3 justify-center flex-col w-[33%] bg-black rounded-md lg:h-40">
                    <h2 className="text-[25px] lg:text-[45px] font-extrabold ">20+</h2>
                    <p className="font-semibold lg:text-[16px] text-[14px]">Refi Project discovered</p>
                </div>
            </div>
    </div>
    </div>
  )
}

export default StatSection