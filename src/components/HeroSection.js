import Image from "next/image";

export default function HeroHeader() {
  return (
    <header
      className="bg-center bg-fixed bg-no-repeat bg-cover h-[75vh] relative"
      style={{
        backgroundImage: `url('/support-bg.svg')`,
      }}
    >
      {/* Overlay */}
      <div className="h-full w-full flex items-center justify-center md:justify-start px-4 md:px-24">
        <div className="text-white max-w-3xl text-center md:text-left">
          <h1 className="font-extrabold text-5xl sm:text-5xl md:text-6xl mb-4 leading-tight">
            <span className="text-white">How</span> Can we <br />
            Help you
          </h1>
        </div>
      </div>
    </header>
  );
}
