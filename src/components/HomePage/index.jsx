import React, { Component } from "react";
import "./index.css";

export default class HomePage extends Component {
  handleOnClick = () => {
    this.setState({
      loading: true
    });

    fetch(`http://localhost:8080/auth`, {
      method: "POST",
      redirect: "follow"
    })
      .then(res => res.json())
      .then(resp => {
        window.location = resp;
      });
  };

  render() {
    return (
      <div className="homepage">
        <div className="welcome">
          <h1> fantasy just got easy. </h1>
          <p>
            welcome to fanteasy, where we aim to make optimizing your fantasy
            bball team as simple as possible for h2h 9cat
          </p>
          <div>
            {" "}
            start off by{" "}
            <div className="button" onClick={this.handleOnClick}>
              {" "}
              signing into Yahoo!{" "}
            </div>{" "}
          </div>
        </div>
        <div className="features">
          <h2> team analysis </h2>
          <p>
            {" "}
            your team will instantly be analyzed and you see what each player
            contributes to each category{" "}
          </p>
          <img src={""} alt="team analysis" />

          <h2> player recommendations </h2>
          <p>
            {" "}
            the algorithm will look for & recommend the best players who can
            patch up those weak spots{" "}
          </p>
          <img src={""} alt="recommended players" />

          <h2> punting </h2>
          <p>
            {" "}
            select your punt strategy so the algorithm can better optomize for
            you{" "}
          </p>
          <img src={""} alt="punt" />

          <h2> trade impact </h2>
          <p>
            {" "}
            manually search for certain players and see how they affect your
            team via trades (before and after){" "}
          </p>
          <img src={""} alt="before & after" />
        </div>
        <div className="button" onClick={this.handleOnClick}>
          {" "}
          sign into get started{" "}
        </div>
      </div>
    );
  }
}
