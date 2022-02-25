import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { statName } from "../../consts";
import "./index.css";
import { rgbToHex } from "@material-ui/core";

function generateColumns() {
  const finalColumns = [
    {
      headerName: " ",
      field: "headshotURL",
      renderCell: params => {
        if (params.value)
          return <img height={"36px"} src={params.value} alt="img" />;
      },
      flex: 0.8
    },
    {
      headerName: "NAME",
      description: "Player Name",
      field: "playerName",
      flex: 3,
    },
    {
      headerName: "POS",
      description: "Eligible Positions",
      field: "positions",
      flex: 1.2,
    },
    {
      headerName: "GP",
      description: "Games Played",
      field: "GP",
      type: "number",
      flex: 1.2,
    },
    {
      headerName: "INJ",
      description: "Status",
      field: "status",
      flex: 1.2,
    },
    {
      headerName: "FG%",
      description: "Field Goal Percentage",
      field: "FG%",
      type: "number",
      flex: 1.3,
    },
    {
      headerName: "FT%",
      description: "Free Throw Percentage",
      field: "FT%",
      type: "number",
      flex: 1.2
    },
    {
      headerName: "3PT",
      description: "Three Pointers",
      field: "3PT",
      type: "number",
      flex: 1.2
    },
    {
      headerName: "PTS",
      description: "Points",
      field: "PTS",
      type: "number",
      flex: 1.2
    },
    {
      headerName: "REB",
      description: "Rebounds",
      field: "REB",
      type: "number",
      flex: 1.2
    },
    {
      headerName: "AST",
      description: "Assists",
      field: "AST",
      type: "number",
      flex: 1.2
    },
    {
      headerName: "STL",
      description: "Steals",
      field: "STL",
      type: "number",
      flex: 1.2
    },
    {
      headerName: "BLK",
      description: "Blocks",
      field: "BLK",
      type: "number",
      flex: 1.2
    },
    {
      headerName: "TO",
      description: "Turnovers",
      field: "TO",
      type: "number",
      flex: 1.2
    }
  ];

  return finalColumns;
}

function generateData(roster, rosterAdvanced) {
  const averageStats = Array(11).fill(0);
  averageStats[0] = [0, 0];
  averageStats[2] = [0, 0];

  console.log(roster, rosterAdvanced);

  const arr = roster.map((player, index) => {
    const playerKey = player.getElementsByTagName("player_key")[0].value;
    const playerName = player.getElementsByTagName("full")[0].value;
    const headshotURL = player.getElementsByTagName("image_url")[0].value;
    const playerStats = player
      .getElementsByTagName("player_stats")[0]
      .getElementsByTagName("stat");

    const gamesPlayed = rosterAdvanced[index]
      .getElementsByTagName("stat")[0]
      .getElementsByTagName("value")[0].value;
    const positions = player.getElementsByTagName("display_position")[0].value;
    const status = player.getElementsByTagName("status")[0]?.value;
    const dataObj = {
      headshotURL,
      playerName,
      positions,
      id: playerKey,
      status
    };

    for (let i = 0; i < playerStats.length; i++) {
      const statValue = playerStats[i].getElementsByTagName("value")[0].value;
      if (statValue === '-' || statValue === '-/-') {
        dataObj[statName[i]] = statValue;
      } else if (i === 0 || i === 2) {
        let [shotsMade, attempts] = statValue.split("/");
        shotsMade = (parseInt(shotsMade) / parseInt(gamesPlayed)).toFixed(3);
        attempts = (parseInt(attempts) / parseInt(gamesPlayed)).toFixed(3);
        averageStats[i][0] = averageStats[i][0] + parseFloat(shotsMade);
        averageStats[i][1] = averageStats[i][1] + parseFloat(attempts);
      } else if (i > 3) {
        dataObj[statName[i]] = (parseInt(statValue) / gamesPlayed).toFixed(1);
        averageStats[i] = averageStats[i] + parseFloat(dataObj[statName[i]]);
      } else {
        dataObj[statName[i]] = statValue;
      }
    }

    dataObj["GP"] = parseInt(gamesPlayed) || 0;
    //console.log('dataObj', dataObj);
    return dataObj;
  });

  const averageObj = {};

  for (let i = 0; i < averageStats.length; i++) {
    if (i === 0 || i === 2) {
      averageStats[i] = (averageStats[i][0] / averageStats[i][1]).toFixed(3);
    } else {
      averageStats[i] = (averageStats[i] / roster.length).toFixed(1);
    }
    averageObj[statName[i]] = averageStats[i];
  }

  averageObj["FG%"] = String(averageObj["FGA"]).substr(1);
  averageObj["FT%"] = String(averageObj["FTA"]).substr(1);

  return arr;
}

/* 
average fg: .484
average ft: .802
average pts: 15.9, 
average 3s: 1.7
average reb: 5.8
average ast: 3.5
average stl: 1.0
average blk: 0.7
average to: 1.8
*/
function PlayerStats(roster, rosterAdvanced) {
  const rows = generateData(roster, rosterAdvanced);
  const columns = generateColumns();
  return (
    <div style={{ display: "flex", height: "100%", justifyContent: "center" }}>
      <div style={{ width: "95%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          disableColumnMenu
          hideFooter
          density={"compact"}
        />
      </div>
    </div>
  );
}

export default PlayerStats;
