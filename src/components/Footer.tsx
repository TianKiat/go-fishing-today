import React, { Component } from "react";

type Props = {};

type State = {};

export default class Footer extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="navbar navbar-expand-lg px-3 navbar-dark bg-primary fixed-bottom justify-content-center">
        <span className="navbar-text mr-2">© 2022 Ng Tian Kiat</span>
        <small className="navbar-text mr-auto">
          All art assets belong to their original creators
        </small>
      </div>
    );
  }
}
