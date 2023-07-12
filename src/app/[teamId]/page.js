import Image from "next/image";
import TeamSelect from "./select";
import { getTeamData, getAllTeamIds } from "../espn";

const Row = ({ id, logo, name, score, winner, date }) => {
  // Convert the ISO date string to a readable date.
  // Format the date like this: 11/27 9PM.

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    // minute: "2-digit",
  });

  return (
    <div className="flex justify-between px-8 py-2 border-b border-gray-300">
      <div className="flex">
        <Image
          src={logo}
          alt="Iowa State Cyclones"
          width={20}
          height={20}
          className="w-5 h-5"
        />
        <p className="ml-4 font-semibold">{name}</p>
      </div>
      <div className="flex text-right">
        <p className="text-gray-700"> {score}</p>
        {score ? (
          winner ? (
            <p className="ml-2 font-semibold text-green-700">W</p>
          ) : (
            <p className="ml-2 font-semibold text-red-700">L</p>
          )
        ) : (
          <p className="text-gray-700">{formattedDate}</p>
        )}
      </div>
    </div>
  );
};

// This instence of the page component is server components by default.
export default async function Home({ params }) {
  const [team, allTeams] = await Promise.all([
    getTeamData(params.teamId),
    getAllTeamIds(),
  ]);

  const { name, record, logo, color, standing, games } = team;

  return (
    <>
      <div className="mb-6 border border-gray-300 rounded-md dark:border-gray-700 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
        <select
          className="w-full px-2 py-3 font-semibold text-gray-800 bg-white border-r-8 rounded-md dark:bg-black dark:text-gray-200 border-r-transparent bg-none"
          defaultValue={params.teamId}
        >
          {allTeams.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <h2 className="ml-4 text-xl font-semibold">Schedule</h2>
      <h3 className="mb-2 ml-4 font-semibold text-gray-700">Full</h3>

      {games.map((game) => {
        return <Row key={game.id} {...game} />;
      })}
    </>
  );
}