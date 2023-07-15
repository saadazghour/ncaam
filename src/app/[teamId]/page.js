import Image from "next/image";
import TeamSelect from "./select";
import { getTeamData, getAllTeamIds } from "../espn";

const Row = ({
  id,
  logo,
  name,
  color,
  rank,
  homeScore,
  awayScore,
  winner,
  date,
}) => {
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

  const { id, name, logo, color, standing, games } = team;
  const [allGames] = games;

  return (
    <>
      <div className="h-4 w-full ml-2" style={{ background: `#${color}` }} />
      <div className="max-w-lg ml-2 py-4">
        <div className="flex items-start">
          <Image src={logo} alt={name} width={24} height={24} />
          <h1 className="font-semibold ml-2 text-1xl">{name}</h1>
        </div>
        <h3 className="text-gray-700 dark:text-gray-300 mb-2">{` • ${standing}`}</h3>
      </div>

      <TeamSelect allTeams={allTeams} teamId={params.teamId} />

      <h2 className="ml-4 text-xl font-semibold">Schedule</h2>
      <h3 className="mb-2 ml-4 font-semibold text-gray-700">Full</h3>

      {allGames.map((game) => {
        return <Row key={game.id} {...game} />;
      })}
    </>
  );
}
