export const ROSTER_URL =
  "https://fantasysports.yahooapis.com/fantasy/v2/team/253.l.102614.t.10/roster/players";
export const API_URL = `http://localhost:8080`;
const REDIRECT_URI = `http://localhost:3000/about`;
const CLIENT_ID = `dj0yJmk9U01TRkVnQkcwUEx3JmQ9WVdrOVNUaFdSVGMzVm5JbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWE2`;
export const AUTH_URL = `https://api.login.yahoo.com/oauth2/request_auth?client_id=${CLIENT_ID}--&redirect_uri=${REDIRECT_URI}&response_type=code&language=en-us`;
export const statName = [
  "FGA",
  "FG%",
  "FTA",
  "FT%",
  "3PT",
  "PTS",
  "REB",
  "AST",
  "STL",
  "BLK",
  "TO"
];
