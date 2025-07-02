
import Image from "next/image";


const StatSection = () => {
  return (
    <div className="px-[5%] h-[110vh] lg:h-[90vh] relative w-full flex  flex-col overflow-hidden gap-10">
        <div className="lg:w-3/4 w-full h-full relative">
            <Image
                fill
                src={"/statImg.png"}
                alt=""
                className="object-contain h-auto top-0"
            />
        </div>
        <div className="flex flex-wrap w-full md:w-full lg:w-2/3 items-center justify-center
            text-white h-full md:absolute gap-5 top-10 lg:-right-20">
            <div className="lg:w-[33%] w-[40%] space-y-3 md:w-[48%] bg-black rounded-md h-40 flex flex-col items-center justify-center">
                <h2 className="font-extrabold tracking-widest text-4xl">10+</h2>
                <p className="text-sm">Grant rounds explored</p>
            </div>
            <div className="lg:w-[33%] w-[40%] space-y-3 md:w-[48%] bg-black rounded-md h-40 flex flex-col items-center justify-center">
                <h2 className="font-extrabold tracking-widest text-4xl">15+</h2>
                <p className="text-sm">Funds tracked</p>
            </div>
            <div className="flex items-center justify-center flex-col lg:w-[33%] w-[40%] md:w-[48%] bg-black rounded-md h-40 lg:-mt-[350px]">
                <h2 className="text-3xl font-extrabold tracking-widest">98%</h2>
                <p>Alerts sent</p>
            </div>
        </div>
    </div>
  )
}

export default StatSection