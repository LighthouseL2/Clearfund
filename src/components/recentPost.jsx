
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
                {/* <Link href={"/"} className="text-[#095012]  text-[18px] capitalize font-semibold flex items-center gap-3 justify-center">visit our blog <span>
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.923828 0.626953L5.42383 5.12695L0.923828 9.62695" fill="#095012"/>
                    </svg>

                </span></Link> */}
            </header>

            {/* <div className="grid lg:grid-cols-3 gap-10 mt-20 space-y-10 md:space-y-0 lg:h-[538.44140625px]">
                {
                    posts && posts.length > 0 && posts.map((post, index) =>(
                    <div className="rounded-md py-9 space-y-3 shadow " key={index}>
                        <div className="w-[319px] h-52 relative mx-auto rounded-md">
                            <Image
                                src={post.image}
                                fill
                                alt=""
                                className="rounded-md object-cover object-center"
                            />
                        </div>

                        <div className="text-black space-y-2 px-11">
                            <h1 className="capitalize font-sans font-bold w-5/6 h-[58px] text-[28px]">
                                {post.title}
                            </h1>
                            <p className="text-black/60  font-sans text-[16px] h-[80px] mt-10">
                                {post.desc}
                            </p>
                            <div className="space-y-2 flex flex-col mt-5">
                                <p className="mt-5 capitalize text-black/50 font-sans text-[14px]">ezekiel lawson</p>
                                <p className="opacity-50 text-[14px] font-sans"><span>June 23th, 2025 </span>* 1 min Read</p>
                                <a href="" className="text-[#EC4B6A] font-sans text-[16px] font-semibold uppercase">Read more</a>
                            </div>
                        </div>
                    </div>
                    ))
                }
            </div> */}
        </div>
  )
}

export default RecentPost