import Image from "next/image";

const Row = () => {
  return (
    <div className="flex justify-between px-4 py-2 border-b border-gray-300">
      <div className="flex">
        <Image
          src="https://a.espncdn.com/i/teamlogos/ncaa/500/66.png"
          alt="Iowa State Cyclones"
          width={20}
          height={20}
        />
        <p className="ml-4 font-semibold">Iowa State Cyclones</p>
      </div>
      <div className="flex text-right">
        <p className="text-gray-700">88-39</p>
        <p className="ml-2 font-semibold text-green-700">W</p>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Row />
      <Row />
      <Row />
    </>
  );
}
