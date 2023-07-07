import Image from "next/image";

const Row = ({ image, name, score, win, date }) => {
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
          src={image}
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
          win ? (
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
export default async function Home() {
  // This fetch is Equivilance to getStaticProps in NextJS.
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
        date: event.competitions[0].date,
        name: competitor.team.displayName,
        logo: competitor.team.logos[0].href,
        score: competitor.score.value,
        win: winner,
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
      <h2 className="ml-4 text-xl font-semibold">Schedule</h2>
      <h3 className="mb-2 ml-4 font-semibold text-gray-700">Full</h3>
      {events.map((event) => {
        const { id, name, logo, score, win, date } = event[1]; // we only want the second competitor

        return (
          <Row
            key={id}
            name={name}
            image={logo}
            date={date}
            score={score}
            win={win}
          />
        );
      })}
    </>
  );
}
