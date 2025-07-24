
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";


const RecentPost = () => {

    const posts = [
        {
            title: "spolight: builder insights",
            desc: `Discover how builders are regenerating the world, one block at
                a time with stories that inspire, lessons that guide, and impact you can feel.`,
            author: "ezekiel lawson",
            image: "/rig.png"
        },
        {
            title: "Latest Research",
            desc: `Stay informed with data-driven insights, breakthrough research, and
                real-world applications transforming the future of people and the planet.`,
            author: "ezekiel lawson",
            image: "/research.png"
        },
        {
            title: "grant tips",
            desc: `From writing tips to funding strategies simplify the process and boost
                your chances of success. Learn what funders look for, avoid common mistakes.`,
            author: "ezekiel lawson",
            image: "/tips.png"
        },
    ]



  return (
    <div className="bg-white p-[5%] mb-20 lg:mb-20">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl md:text-4xl font-bold text-black opacity-30">Our Blog</h1>
            </header>
            <div className="grid lg:grid-cols-2 gap-5 mt-20 lg:h-[500px]">
                <div>
                    <img src="/blog1.jpg" alt="blog photo" className="rounded-2xl w-full h-[364px]"/>
                    <h1 className="text-[34px] font-sans leading-8 font-medium w-3/4 mt-5">How ReFi is Changing the Way We Think About Money</h1>
                    <small className="mt-4 block text-black/50">July 12 2025</small>
                </div>
                <div>
                    <img src="/blog2.jpg" alt="blog photo" className="rounded-2xl w-full h-[364px]"/>
                    <h1 className="text-[34px] font-sans leading-8 font-medium w-3/4 mt-5">
                        GG21 Regen Coordi-Nation QF Genesis Round Review
                    </h1>
                    <small className="mt-4 block text-black/50">Feb 12, 2025</small>
                </div>
            </div>

            {/* <a href="" className="bg-[#198038] block text-center text-white mt-20 h-[52px] w-[202.1923828125px] mx-auto">
                Visit Blog
            </a> */}
            <div className="bg-[#198038] rounded-md w-[202px] mx-auto flex justify-center items-center h-[52px] mt-20">
                <a href="/" className="text-white ">Visit Blog</a>
            </div>
        </div>
  )
}

export default RecentPost