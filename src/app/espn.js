export default async function getScheduleGames(teamId) {
  // This fetch is Equivilance to getStaticProps in NextJS.
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/${teamId}/schedule`
  );

  const data = await res.json();

  // for all of the events on the schedule
  // we want to iterate over the competitors and get the name and logo
  // we also want to get the score and the winner

  return data.events.map((event) => {
    const { competitors } = event.competitions[0];

    const competitorsArray = competitors.map((competitor) => {
      return {
        id: competitor.team.id,
        date: event.competitions[0].date,
        name: competitor.team.displayName,
        logo: competitor.team.logos[0].href,
        score: competitor.score.value,
        winner: competitor.winner,
      };
    });

    // We are filtering to get some of the data we need.
    const otherTeam = competitorsArray.find((c) => c.id != 66);
    const favoriteTeam = competitorsArray.find((c) => c.id == 66);
    const score = favoriteTeam.score;

    return {
      id: event.id,
      date: event.competitions[0].date,
      name: otherTeam.name,
      logo: otherTeam.logo,
      score: score && `${otherTeam.score}-${favoriteTeam.score}`,
      winner: favoriteTeam.winner,
    };
  });
}
