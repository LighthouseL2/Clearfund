import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const GrantProjects = () => {
  const project = [
    {
      image: "/mask.png",
      name: "Proof-of-Ship- Season 6",
      description:
        "Deploying solar microgrids to provide clean energy access to rural communities in kenya.",
      fundingSources: ["Gitcoin", "Octant", "Giveth"],
      },
      {
      image: "/mask.png",
      name: "Proof-of-Ship- Season 6",
      description:
        "Deploying solar microgrids to provide clean energy access to rural communities in kenya, Deploying solar microgrids to provide clean.",
      fundingSources: ["Gitcoin", "Octant", "Giveth"],
    },
  ];
  const getSourceStyles = (source) => {
    switch (source) {
      case "Gitcoin":
        return "bg-purple-100 text-purple-800 border border-purple-300";
      case "Octant":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      case "Giveth":
        return "bg-green-100 text-green-800 border border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  return (
    <div className="relative">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-16 w-full text-black justify-items-center">
        {project.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between h-full w-full max-w-[370px] border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition"
          >
            {/* Top image */}
            <div className="h-[56px] relative">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover object-top rounded-t-lg"
              />
            </div>

            {/* Card content */}
            <div className="flex-grow mt-5 px-6 pb-6">
              {/* Title */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-[16px] text-black font-semibold leading-snug">
                  {item.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-[14px] font-sans leading-snug text-gray-700 mb-6">
                {item.description}
                    </p>
                    
                    <p className="text-sm text-gray-500">Funding Sources</p>

              {/* Funding Sources with custom colors */}
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                {item.fundingSources.map((source, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 rounded-full ${getSourceStyles(source)}`}
                  >
                    {source}
                  </span>
                ))}
              </div>
            </div>

            {/* Apply button pinned to bottom */}
           <div className="px-5 py-3 border-t border-gray-200">
              <Link
                href="#"
                className="block font-sans bg-[#198038] hover:bg-[#198038] transition rounded-md w-full py-3 text-center text-white text-sm font-medium"
              >
                Visit Project <ExternalLink className="w-4 h-4 inline ml-2" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GrantProjects;
