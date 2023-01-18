import React, { Component } from "react";

class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <a className="logo__link" href="/">
          <img
            src="https://static.tildacdn.com/tild6166-3965-4239-a437-326132303463/Logo_mint.svg"
            alt="logo"
          />
        </a>
      </div>
    );
  }
}

export default Logo;
