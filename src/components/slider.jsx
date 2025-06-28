"use client"


import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay"

const SliderLogos = () => {

    const items = [
            {
                name: "Gitcoin",
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