import * as React from "react"


import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const loader = [
    {title: "Bringing funding data into focus…"},
    {title: "Latest Funding Stream…"},
    {title: "Clear insights ahead..."},
]

export function LoadingSlide() {
  return (
    <Carousel className="w-full max-w-xs bg-white border-0 "
        
        plugins={[
        Autoplay({
          delay: 2000,
          stopOnLastSnap:true
        }),
      ]}
    >
      <CarouselContent className={"border-0 shadow-none"}>
        {loader.map((data, index) => (
          <CarouselItem key={index}>
            <div className="p-1 flex items-center justify-center text-black mt-2 text-[12px]">
              {/* <Card>
                <CardContent className="flex items-center justify-center text-black mt-2 text-[12px]">
                  <span className="">{data.title}</span>
                </CardContent>
              </Card> */}
              <p>{data.title}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  )
}
