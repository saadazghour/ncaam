export async function getTeamData(teamId) {
  // This fetch is Equivilance to getStaticProps in NextJS.
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams/${teamId}`
  );

  const data = await res.json();

  // For all of the events on the schedule
  // We want to iterate over the competitors and get the name and logo
  // We also want to get the score and the winner

  const games = data.team.nextEvent.map((event) => {
    const { competitors, date } = event.competitions[0];

    // We are filtering to get some of the data we need.
    const otherTeam = competitors.find((c) => c.team.id != teamId);
    const favoriteTeam = competitors.find((c) => c.team.id == teamId);

    // Unfortunately this data isn't on this API yet
    // This is for teams with black logos, so we invert the color of the image

    const color =
      favoriteTeam.team.displayName ===
      ("Iowa Hawkeyes" || "Long Beach State Beach")
        ? "000000"
        : "TODO";

    // Some teams don't have logos, use the default logo.
    const logo = otherTeam.team.logos
      ? otherTeam.team.logos[0].href
      : "https://a.espncdn.com/i/teamlogos/default-team-logo-500.png";

    return competitors.map((c) => {
      return {
        id: c.team.id,
        date: date,
        name: c.team.displayName,
        rank: otherTeam.curatedRank.current,
        homeScore: favoriteTeam.score?.value,
        awayScore: otherTeam.score?.value,
        winner: favoriteTeam.winner,
        logo,
        color,
      };
    });
  });

  // This is for the team's data
  const logoTeam = data.team.logos
    ? data.team.logos[0].href
    : "https://a.espncdn.com/i/teamlogos/default-team-logo-500.png";

  return {
    id: teamId,
    name: data.team.displayName,
    logo: logoTeam,
    color: data.team.color,
    standing: data.team.standingSummary,
    games,
  };
}

export async function getAllTeamIds() {
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

  // Sort teams Alphabetically A-Z
  teams.sort((a, b) => {
    a.name > b.name ? 1 : -1;

    return 0;
  });

  return teams;
}
