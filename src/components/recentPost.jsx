
import Image from "next/image";
import { MoveRight } from "lucide-react";

const RecentPost = () => {

    const posts = [
        {
            title: "spolight: builder insights",
            desc: `Discover how builders are regenerating the world, one block at a
                 time with stories that inspire, lessons that guide and impact you can feel.`,
            author: "ezekiel lawson",
            image: "/research.png"
        },
        {
            title: "Latest Research",
            desc: `Discover how builders are regenerating the world, one block at a
                time with stories that inspire, lessons that guide and impact you can feel.`,
            author: "ezekiel lawson",
            image: "/research.png"
        },
        {
            title: "grant tips",
            desc: `From writing tips to funding strategies, simplify the process and boost your chances of
                success. Learn what funders look for, avoid common mistakes`,
            author: "ezekiel lawson",
            image: "/tips.png"
        },
    ]

  return (
    <div className="bg-white p-[5%] mb-20 lg:mb-0">
            <header className="flex items-center justify-between">
                <h1 className="text-4xl font-bold text-[#7F7F7F]">Recent Post</h1>
                <a href="" className="text-green-500 font-semibold flex items-center gap-3 justify-center">visit our blog <MoveRight /></a>
            </header>

            <div className="grid lg:grid-cols-3 gap-10 mt-20">
                {
                    posts && posts.length > 0 && posts.map((post, index) =>(
                    <div className="rounded-md p-5 space-y-3 shadow-2xl" key={index}>
                        <div className="w-full h-52 relative rounded-md">
                            <Image
                                src={post.image}
                                fill
                                alt=""
                                className="rounded-md object-cover object-center"
                            />
                        </div>

                        <div className="text-black space-y-2">
                            <h1 className="capitalize font-bold text-4xl">{post.title}</h1>
                            <p className="text-[#7F7F7F]">
                                {post.desc}
                            </p>
                            <div className="space-y-3 flex flex-col text-[#7F7F7F]">
                                <p className="mt-5 capitalize">ezekiel lawson</p>
                                <p className="flex justify-between"><span>June 23th, 2025 </span> 1 min Read</p>
                                <a href="" className="text-red-600">Read more</a>
                            </div>
                        </div>
                    </div>
                    ))
                }
            </div>
        </div>
  )
}

export default RecentPost