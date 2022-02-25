import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Cookies from "universal-cookie";
import XMLParser from "react-xml-parser";
import "./index.css";
import PlayerStats from "../PlayerStats";
const cookies = new Cookies();

export default class TeamAnalysis extends Component {
  state = {
    teams: [],
    roster: {},
    rosterAdvanced: {}
  };

  componentDidMount() {
    this.getTeamInfo();
  }

  handleOnClick(team) {
    if (!team) return;
    const token = cookies.get("x-access-token");
    const formData = new FormData();
    formData.append(0, token);
    formData.append(1, team.team_key);
    const parser = new XMLParser();

    fetch(`http://localhost:8080/get-team`, {
      method: "POST",
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        const xml = parser.parseFromString(data, "text/xml");
        const roster = xml.getElementsByTagName("players")[0];
        this.setState({ roster });
        return roster;
      })
      .then(roster => {
        let stringToSend = ``;
        const playerKeys = roster
          .getElementsByTagName("player_key")
          .map(key => key.value);
        playerKeys.map((player, index) => {
          if (index === playerKeys.length - 1) {
            stringToSend = stringToSend + player;
            return null;
          }
          stringToSend = stringToSend + player + ",";
          return null;
        });
        const statFormData = new FormData();
        statFormData.append(0, token);
        statFormData.append(1, stringToSend);
        fetch(`http://localhost:8080/get-stats`, {
          method: "POST",
          body: statFormData
        })
          .then(response => response.text())
          .then(data => {
            const parser = new XMLParser();
            const xml = parser.parseFromString(data, "text/xml");
            const rosterWithAdvancedStats = xml.getElementsByTagName(
              "players"
            )[0];
            this.setState({ rosterAdvanced: rosterWithAdvancedStats });
          });
      });
  }

  getTeamInfo() {
    const token = cookies.get("x-access-token");
    const formData = new FormData();
    formData.append(0, token);

    fetch(`http://localhost:8080/get-team-keys`, {
      method: "POST",
      body: formData
    })
      .then(response => response.text())
      .then(data => {
        const parser = new XMLParser();
        const xml = parser.parseFromString(data, "text/xml");
        const teamKeys = xml.getElementsByTagName("team");
        const teams = teamKeys
          .map(key => key.children)
          .map(team => {
            const teamObj = {};
            for (let property of team) {
              teamObj[property.name] = property.value;
            }
            return teamObj;
          });

        this.setState({ teams });
      });
  }

  render() {
    const { teams, roster, rosterAdvanced } = this.state;
    if (!teams.length) return <div> No teams found </div>;
    return (
      <div>
        <div className="teamInput">
          <Autocomplete
            clearOnBlur
            selectOnFocus
            options={teams}
            getOptionLabel={option => option.name}
            renderInput={params => {
              return (
                <TextField
                  {...params}
                  label="Select your team"
                  variant="outlined"
                />
              );
            }}
            onChange={(event, newValue) => this.handleOnClick(newValue)}
          />
        </div>
        {Object.keys(roster).length !== 0 &&
        Object.keys(rosterAdvanced).length !== 0
          ? PlayerStats(roster.children, rosterAdvanced.children)
          : null}
      </div>
    );
  }
}
