
import { Twitter, Youtube } from "lucide-react"

const Footer = () => {

    let today = new Date().getUTCFullYear()
    
  return (
    <footer className="bg-black pt-[5%] px-[5%] pb-5 text-white flex items-center justify-between flex-wrap">
        <div className="lg:w-2/3 w-full">
            <h2 className="mb-20">ClearFund logo</h2>

            <h2 className="text-3xl font-bold mb-5">Get the latest updates</h2>
            <p className="mb-3 text-[#7F7F7F]">Subscribe to our newsletter and get all updates straight to your mailbox</p>
            <form action="" className="border border-[#7F7F7F] rounded-md w-5/6 lg:w-3/6 flex mb-20">
                <input type="text" className="outline-none w-2/3 p-3" placeholder="Enter your email"/>
                <button className="w-1/3 bg-green-500 text-black border-0 rounded-r-md">Subscribe</button>
            </form>

            {/* <p>© {today} ClearFund. All rights reserved</p> */}
        </div>

        <div className="px-[5%] w-full lg:w-1/3">
            {/* socials */}
            <div className="flex gap-10 mb-14">
                <Twitter />
                <Youtube />
                <span>X</span>
            </div>

            <div className="flex justify-between w-5/6">
                <div>
                    <h3 className="uppercase mb-3">About</h3>
                    <ul className="space-y-3 text-[#7F7F7F]">
                        <li>Home</li>
                        <li>FAQ</li>
                        <li>Blog</li>
                        <li>Contact</li>
                    </ul>
                </div>


                <div>
                    <h3 className="uppercase mb-3">How we can help </h3>
                    <ul className="space-y-3 text-[#7F7F7F]">
                        <li>Grant Tips</li>
                        <li>ReFi Grant</li>
                        <li>Explorer</li>
                        <li>Grant Alerts</li>
                    </ul>
                </div>

            </div>

        </div>

        <div className="flex flex-wrap-reverse gap-5 mt-20 justify-between w-full pr-[2%]">
            <p className="text-xs text-[#7F7F7F]">© {today} ClearFund. All rights reserved</p>

            <div className="flex justify-between gap-20 text-[#7F7F7F]">
                <a href="">Privacy Policy</a>
                <a href="">Terms and Conditions</a>
            </div>
        </div>
    </footer>
  )
}

export default Footer