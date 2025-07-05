
import Image from "next/image";


const StatSection = () => {
  return (
    <div className="flex justify-center items-center overflow-hidden">
        <div className="px-[5%] h-[90vh] relative w-full flex  flex-col gap-10">
            <div className="lg:w-3/4 h-full relative w-full">
                <Image
                    fill
                    src={"/statImg.png"}
                    alt=""
                    className="object-contain top-0"
                />
            </div>
            <div className="flex flex-wrap lg:w-2/3 items-center justify-center
                text-white absolute gap-5 top-[23%] h-[45vh]  -right-20 w-full">
                <div className="w-[33%] space-y-3 bg-black rounded-md h-40 flex flex-col items-center justify-center">
                    <h2 className="font-semibold  text-[45px]">10+</h2>
                    <p className="font-semibold text-[16px]">Grant rounds explored</p>
                </div>
                <div className="w-[33%] space-y-3 bg-black rounded-md h-40 flex flex-col items-center justify-center">
                    <h2 className="font-semibold  text-[45px]">15+</h2>
                    <p className="font-semibold text-[16px]">Funds tracked</p>
                </div>
                <div className="flex items-center justify-center flex-col w-[33%] bg-black rounded-md h-40">
                    <h2 className="text-[45px] font-semibold ">98%</h2>
                    <p className="font-semibold text-[16px]">Alerts sent</p>
                </div>
                <div className="flex items-center justify-center flex-col w-[33%] bg-black rounded-md h-40">
                    <h2 className="text-[45px] font-extrabold ">20+</h2>
                    <p className="font-semibold text-[16px]">Refi Project discovered</p>
                </div>
            </div>
    </div>
    </div>
  )
}

export default StatSection