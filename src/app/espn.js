export async function getTeamData(teamId) {
  // This fetch is Equivilance to getStaticProps in NextJS.
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/${teamId}/schedule`
  );

  const data = await res.json();

  // For all of the events on the schedule
  // We want to iterate over the competitors and get the name and logo
  // We also want to get the score and the winner

  const games = data.events.map((event) => {
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
    const otherTeam = competitorsArray.find((c) => c.id != teamId);
    const favoriteTeam = competitorsArray.find((c) => c.id == teamId);
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

  return {
    name: data.team.displayName,
    logo: data.team.logo,
    color: data.team.color,
    record: data.team.recordSummary,
    standing: data.team.standingSummary,
    games,
  };
}

export async function getAllTeamIds(teamId) {
  // Total Pages is the number of teams divided by 100 (max 100 teams per page).
  // const totalPages = data.sports.leagues[0].teams.length / 100;

  let page = 1;
  let teams = [];

  while (page <= 8) {
    const res = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams?page=${page}`
    );

    const data = await res.json();

    teams.push(
      ...data.sports[0].leagues[0].teams.map(({ team }) => {
        return {
          id: team.id,
          name: team.displayName,
        };
      })
    );

    page++;
  }

  return teams;
}
