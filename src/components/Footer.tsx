import React, { Component } from "react";

type Props = {};

type State = {};

export default class Footer extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="navbar navbar-expand-lg px-3 navbar-dark justify-content-center">
        <small className="navbar-text mx-2">© 2022 Ng Tian Kiat </small>
        <small className="navbar-text mx-2">
          Contact me: ngtiankiat97@gmail.com
        </small>
        <small className="navbar-text mx-2">
          All art assets belong to their original creators
        </small>
      </div>
    );
  }
}
