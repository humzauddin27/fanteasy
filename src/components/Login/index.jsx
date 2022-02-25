import React, { Component } from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class Login extends Component {
  componentDidMount() {
    this.validateUrl();
  }

  validateUrl() {
    //add error case
    console.log('we getting here?');
    const tokenCode = window.location.href.match(/\?code=.*/g)[0].substr(6);
    const formData = new FormData();
    formData.append(0, tokenCode);
    fetch(`http://localhost:8080/get_token`, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(resp => {
        console.log('setting cookie');
        cookies.set('x-access-token', resp.access_token, { path: '/' });
        window.open('https://localhost:3000/team-analysis', "_self");
      });
  }

  render() {
    return <h2> Logging you in </h2>
  }
}