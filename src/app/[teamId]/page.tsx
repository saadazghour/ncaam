import Image from "next/image";
import TeamSelect from "./select";
import ImageTeam from "./imageTeam";

import { getTeamData, getAllTeamIds } from "../espn";

const Row = ({ logo, name, homeScore, awayScore, winner, date }) => {
  return (
    <div className="flex justify-between px-8 py-2 border-b border-gray-300">
      <div className="flex">
        <Image
          src={logo}
          alt={name}
          width={20}
          height={20}
          className="w-5 h-5"
        />
        <p className="ml-4 font-semibold">{name}</p>
      </div>
      <div className="flex text-right">
        {homeScore ? (
          <p className="text-gray-700 dark:text-gray-300">
            {`${homeScore}-${awayScore}`}
          </p>
        ) : null}

        {homeScore ? (
          winner ? (
            <p className="ml-2 font-semibold text-green-700">W</p>
          ) : (
            <p className="ml-2 font-semibold text-red-700">L</p>
          )
        ) : (
          <p className="text-gray-700 dark:text-gray-300">{date}</p>
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

  const { name, logo, color, standing, games } = team;
  const [allGames] = games;

  return (
    <>
      <ImageTeam name={name} logo={logo} color={color} standing={standing} />
      <TeamSelect allTeams={allTeams} teamId={params.teamId} />

      <h2 className="ml-4 text-xl font-semibold">Schedule</h2>
      <h3 className="mb-2 ml-4 font-semibold text-gray-700">Full</h3>

      {allGames.map((game) => {
        return <Row key={game.id} {...game} />;
      })}
    </>
  );
}
