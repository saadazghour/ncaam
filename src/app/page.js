import Image from "next/image";

const Row = ({ image, name, score, win }) => {
  return (
    <div className="flex justify-between px-4 py-2 border-b border-gray-300">
      <div className="flex">
        <Image src={image} alt="Iowa State Cyclones" width={20} height={20} />
        <p className="ml-4 font-semibold">{name}</p>
      </div>
      <div className="flex text-right">
        <p className="text-gray-700">{score}</p>
        {win ? (
          <p className="ml-2 font-semibold text-green-700">W</p>
        ) : (
          <p className="ml-2 font-semibold text-red-700">L</p>
        )}
      </div>
    </div>
  );
};

// This instence of the page component is server components by default.
export default async function Home() {
  const response = await fetch(
    "https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/66/schedule"
  );

  const data = await response.json();

  // for all of the events on the schedule
  // we want to iterate over the competitors and get the name and logo
  // we also want to get the score and the winner

  const events = data.events.map((event) => {
    const { competitors } = event.competitions[0];

    // We are filtering to get some of the data we need.
    const winner = competitors.find((c) => c.winner);
    const otherTeam = competitors.find((c) => c.id !== 66);
    const favoriteTeam = competitors.find((c) => c.id === 66);
    const score = favoriteTeam?.score;

    return competitors.map((competitor) => {
      return {
        id: competitor.team.id,
        name: competitor.team.displayName,
        logo: competitor.team.logos[0].href,
        score: competitor.score.value,
        win: competitor.winner,
      };
    });

    // Here we are returning an array of objects.
    // return {
    //   id: competitor.team.id,
    //   name: otherTeam.name,
    //   logo: otherTeam.logo,
    //   score: score && `${otherTeam.score.value}-${favoriteTeam?.score.value}`,
    //   win: winner && favoriteTeam.winner,
    // };
  });

  return (
    <>
      {events.slice(0, 5).map((event) => {
        const { id, name, logo, score, win } = event[1]; // we only want the second competitor

        return (
          <Row key={id} name={name} image={logo} score={score} win={win} />
        );
      })}
    </>
  );
}
