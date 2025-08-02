import Image from "next/image";

export default function HeroHeader() {
  return (
    <header
      className="bg-center bg-fixed bg-no-repeat bg-cover h-[75vh] relative bg-black"
      // style={{
      //   backgroundImage: `url('/support-bg.svg')`,
      // }}
    >
      {/* Overlay */}
      <div className="h-full w-full flex items-center justify-center  px-4 md:px-24">
        <div className="text-white max-w-6xl text-center">
          <h1 className="font-extrabold md:text-[88px] text-5xl mb-4 leading-tight">
            <span className="text-white">How</span> Can we
            Help you
          </h1>
        </div>
      </div>
    </header>
  );
}
