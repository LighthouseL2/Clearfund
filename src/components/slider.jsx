"use client"


import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay"

const SliderLogos = () => {

    const items = [
            {
                // name: <img
                src: "/gitcoin.png",
                alt: "gitconin logo"
                // />
,

            },
            {
                // name: <img
                src: "/giveth.png",
                alt: "giveth logo"
                // />,
            },
            {
                // name: <img
                src: "/octant.png",
                alt: "octant logo"
                // />,
            },
            {
                // name: <img
                    src: "/celo.png",
                    alt: "celo logo"
                // />,
            },
            {
                // name: <img
                src: "/thrive.png",
                alt: "thrive logo"
                // />,
            },

            {
                // name: <img
                src: "/gooddollar.png",
                alt: "Gooddollar logo"
                // />,
            },
            {
                // name: <img
                src: "/arbitrum.png",
                alt: "Arbitrum logo"
                // />,
            },
            {
                // name: <img
                src: "/gitcoin.png",
                alt: "gitconin logo"
                // />
,

            },
            {
                // name: <img
                src: "/giveth.png",
                alt: "giveth logo"
                // />,
            },
            {
                // name: <img
                src: "/octant.png",
                alt: "octant logo"
                // />,
            },
            {
                // name: <img
                    src: "/celo.png",
                    alt: "celo logo"
                // />,
            },
            {
                // name: <img
                src: "/thrive.png",
                alt: "thrive logo"
                // />,
            },

            {
                // name: <img
                src: "/gooddollar.png",
                alt: "Gooddollar logo"
                // />,
            },
            {
                // name: <img
                src: "/arbitrum.png",
                alt: "Arbitrum logo"
                // />,
            },

            

        ]
    
        const plugin = useRef(
            Autoplay({
                delay: 1000,
                stopOnInteraction: true
            })
        )
  return (
        // <Carousel className={"w-full bg-[#A2845E1A] px-[5%] py-5 mt-10 lg:mt-0"} opts={{
        //     align: "start",
        //     slidesToScroll: 1,
        //     }} plugins={[plugin.current]}>
        //     <CarouselContent className={"mx-[5%]"}>
        //         {items.map((item, index) => (
        //             <CarouselItem key={index} className={"basis-1/6 flex items-center"}>
        //                 <div className="p-1">
        //                     {item.name}
        //                 </div>
        //             </CarouselItem>
        //         ))}
        //     </CarouselContent>
        // </Carousel>
        <div className="overflow-hidden w-full  bg-[#A2845E1A]">
            <div className="flex justify-between  w-full max-w-7xl mx-auto py-14">
                <div className="flex animate-slide w-[100%]">
                    <div className="flex w-full gap-16 animate-slide relative">
                        {items.map((item, index) => (
                            <img
                                key={index}
                                src={item.src}
                                alt={item.alt}
                                className="object-contain"
                                style={{width: "full"}}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default SliderLogos