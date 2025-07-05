"use client"


import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay"

const SliderLogos = () => {

    const items = [
            {
                name: <img
                    src="/gitcoin.png"
                    alt="gitconin logo"
                />
,

            },
            {
                name: <img
                    src="/giveth.png"
                    alt="giveth logo"
                />,
            },
            {
                name: <img
                    src="/octant.png"
                    alt="octant logo"
                />,
            },
            {
                name: <img 
                    src="/celo.png"
                    alt="celo logo"
                />,
            },
            {
                name: <img
                    src="/thrive.png"
                    alt="thrive logo"
                />,
            },

            {
                name: <img
                    src="/gooddollar.png"
                    alt="Gooddollar logo"
                />,
            },
            {
                name: <img
                    src="/arbitrum.png"
                    alt="Arbitrum logo"
                />,
            },
            // {
            //     name: "Arbitrum",
            // },
            // {
            //     name: "Arbitrum",
            // },
        ]
    
        const plugin = useRef(
            Autoplay({
                delay: 6000,
                stopOnInteraction: true
            })
        )
  return (
        <Carousel className={"w-full bg-[#A2845E1A] px-[5%] py-5 mt-10 lg:mt-0"} opts={{
            align: "start",
            slidesToScroll: 1,
            }} plugins={[plugin.current]}>
            <CarouselContent className={"mx-[5%]"}>
                {items.map((item, index) => (
                    <CarouselItem key={index} className={"basis-1/3 lg:basis-1/3 flex items-center"}>
                        <div className="p-1">
                            {item.name}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
        </Carousel>
  )
}

export default SliderLogos