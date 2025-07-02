
import Image from "next/image";


const StatSection = () => {
  return (
    <div className="flex justify-center items-center overflow-hidden lg:scale-100 scale-50">
        <div className="px-[5%] h-[90vh] relative w-full flex  flex-col gap-10">
            <div className="lg:w-3/4 h-full relative w-full">
                <Image
                    fill
                    src={"/statImg.png"}
                    alt=""
                    className="object-contain h-auto top-0"
                />
            </div>
            <div className="flex flex-wrap lg:w-2/3 items-center justify-center
                text-white absolute gap-5 top-1/5 h-[45vh]  -right-20 w-full">
                <div className="w-[33%] space-y-3 bg-black rounded-md h-40 flex flex-col items-center justify-center">
                    <h2 className="font-extrabold tracking-widest text-4xl">10+</h2>
                    <p className="text-sm">Grant rounds explored</p>
                </div>
                <div className="w-[33%] space-y-3 bg-black rounded-md h-40 flex flex-col items-center justify-center">
                    <h2 className="font-extrabold tracking-widest text-4xl">15+</h2>
                    <p className="text-sm">Funds tracked</p>
                </div>
                <div className="flex items-center justify-center flex-col w-[33%] bg-black rounded-md h-40">
                    <h2 className="text-3xl font-extrabold tracking-widest">98%</h2>
                    <p>Alerts sent</p>
                </div>
            </div>
    </div>
    </div>
  )
}

export default StatSection