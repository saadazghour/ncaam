import React from "react";
import Image from "next/image";

const ImageTeam = ({ logo, name, standing, color }) => {
  return (
    <>
      <div className="w-full h-4 ml-2" style={{ background: `#${color}` }} />
      <div className="max-w-lg py-4 ml-2">
        <div className="flex items-start">
          <Image src={logo} alt={name} width={24} height={24} />
          <h1 className="ml-2 font-semibold text-1xl">{name}</h1>
        </div>
        <h3 className="mb-2 text-gray-700 dark:text-gray-300">{` • ${standing}`}</h3>
      </div>
    </>
  );
};

export default ImageTeam;
