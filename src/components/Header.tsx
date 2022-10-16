import React, { Component } from "react";

type Props = {};

type State = {};

export default class Header extends Component<Props, State> {
  state = {};

  render() {
    return (
      <nav className="navbar navbar-expand-lg px-3 bg-primary navbar-dark">
        <a className="navbar-brand" href="#">
          <img
            className="d-inline-block align-top"
            src="https://cdn-icons-png.flaticon.com/512/901/901844.png"
            width="30"
            height="30"
            alt="Fish icons created by Skyclick - Flaticon"
          ></img>
        </a>
        <span className="h4 text-white">Go Fishing Today?</span>
      </nav>
    );
  }
}
