"use client"


import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay"

const SliderLogos = () => {

    const items = [
            {
                name: <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.3686 0.892578C7.14518 0.892578 4.26833 2.40548 2.57182 4.80738C1.56572 6.23316 0.974609 7.97182 0.974609 9.89316C0.974609 11.8145 1.56384 13.6637 2.56245 15.0876C4.25521 17.5017 7.12645 18.9396 10.2993 18.9396C15.4591 18.9396 19.7168 15.2375 19.7168 9.93906C19.7168 4.64063 15.4825 0.892578 10.3686 0.892578ZM10.2993 14.9836C7.63886 14.9836 5.39434 12.9012 5.39434 9.91658C5.39434 7.09406 7.54612 4.84954 10.3462 4.84954C13.1462 4.84954 15.298 7.07064 15.298 9.94C15.298 12.8094 13.1462 14.9836 10.3003 14.9836H10.2993Z" fill="#130C03"/>
                        </svg>
,

            },
            {
                name: "Giveth",
            },
            {
                name: "Octant",
            },
            {
                name: "Celo",
            },
            {
                name: "thrive",
            },
            {
                name: "Arbitrum",
            },
            {
                name: "Arbitrum",
            },
            {
                name: "Arbitrum",
            },
        ]
    
        const plugin = useRef(
            Autoplay({
                delay: 3000,
                stopOnInteraction: true
            })
        )
  return (
        <Carousel className={"w-full bg-[#F5F3EF] px-[5%] py-5 mt-10 lg:mt-0"} opts={{
            align: "start",
            slidesToScroll: 1,
            }} plugins={[plugin.current]}>
            <CarouselContent className={"mx-[5%]"}>
                {items.map((item, index) => (
                    <CarouselItem key={index} className={"basis-1/3 lg:basis-1/3"}>
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