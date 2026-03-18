'use client';

import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 py-16">
            <div className="max-w-[1400px] mx-auto px-8 md:px-12 flex flex-col items-center gap-14">

                {/* SOCIAL LINKS */}
                <div className="flex items-center gap-10">
                    <Link href={"https://x.com/Clear_Fund"} target="_blank" className="hover:scale-110 transition-all text-gray-400 hover:text-[#00AFAA]">
                        <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[1.375rem] h-[1.375rem] fill-current">
                            <path d="M21.6508 21.5777L14.684 10.6364L21.5046 3.13399C21.7439 2.86421 21.8673 2.51097 21.8479 2.15085C21.8285 1.79073 21.668 1.45277 21.4011 1.21022C21.1342 0.967673 20.7825 0.840098 20.4221 0.855152C20.0618 0.870207 19.722 1.02668 19.4762 1.29064L13.1638 8.23916L8.85928 1.4768C8.73558 1.2823 8.56481 1.12214 8.36278 1.01114C8.16075 0.900149 7.93399 0.841903 7.70348 0.841797H2.22141C1.97591 0.84191 1.73494 0.907969 1.52369 1.03307C1.31245 1.15817 1.13869 1.33771 1.02057 1.55294C0.902453 1.76816 0.844318 2.01116 0.852241 2.25654C0.860164 2.50192 0.933854 2.74067 1.06561 2.94782L8.0324 13.8891L1.20723 21.3916C1.08365 21.5243 0.987656 21.6803 0.924796 21.8504C0.861937 22.0205 0.833468 22.2014 0.841038 22.3826C0.848609 22.5638 0.89207 22.7417 0.968901 22.906C1.04573 23.0703 1.1544 23.2177 1.28862 23.3396C1.42284 23.4616 1.57993 23.5557 1.75079 23.6166C1.92165 23.6774 2.10289 23.7037 2.28399 23.6939C2.46509 23.6842 2.64245 23.6386 2.8058 23.5598C2.96915 23.481 3.11524 23.3706 3.23559 23.2349L9.55254 16.2864L13.8571 23.0487C13.9808 23.2432 14.1516 23.4034 14.3536 23.5144C14.5556 23.6254 14.7824 23.6836 15.0129 23.6838H20.495C20.7405 23.6836 20.9815 23.6176 21.1927 23.4925C21.4039 23.3674 21.5777 23.1878 21.6958 22.9726C21.8139 22.7574 21.8721 22.5144 21.8641 22.269C21.8562 22.0236 21.7825 21.7849 21.6508 21.5777ZM15.7655 20.9427L4.71804 3.58283H6.95084L17.9984 20.9427H15.7655Z" />
                        </svg>
                    </Link>



                    <Link href={"https://t.me/+fU2kPPjZ50MxMTE0"} target="_blank" className="hover:scale-110 transition-all text-gray-400 hover:text-[#00AFAA]">
                        <svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[1.375rem] h-[1.375rem] fill-current">
                            <path d="M27.1835 0.278754L1.18704 10.3554C0.14089 10.8247 -0.212945 11.7644 0.934182 12.2744L7.6034 14.4048L23.7287 4.38751C24.6092 3.75865 25.5106 3.92634 24.7349 4.61813L10.8855 17.2227L10.4504 22.5569C10.8534 23.3806 11.5912 23.3844 12.0618 22.975L15.8935 19.3307L22.4558 24.2701C23.98 25.1771 24.8093 24.5918 25.1373 22.9294L29.4416 2.44263C29.8885 0.396355 29.1264 -0.505254 27.1835 0.278754Z" />
                        </svg>
                    </Link>
                </div>

                {/* BOTTOM LEGAL ROW */}
                <div className="flex items-center justify-center w-full text-sm font-medium text-gray-400 gap-4 text-center">
                    <div className="flex items-center gap-6 flex-wrap justify-center">
                        <Link href="/terms" className="hover:text-[#00AFAA] transition-colors">
                            Terms of use
                        </Link>
                        <Link href="/privacy" className="hover:text-[#00AFAA] transition-colors">
                            Privacy policy
                        </Link>
                        <Link href="https://github.com/LighthouseL2/Clearfund" target="_blank" className="hover:text-[#00AFAA] transition-colors">
                            GitHub
                        </Link>
                        <Link href="/grants" target="_blank" className="hover:text-[#00AFAA] transition-colors">
                            Funding
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
