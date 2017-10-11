import React from "react";

const Nav = () =>
  <nav className="navbar navbar-default navbar-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="collapsed navbar-toggle">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" /> <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a href="/" className="navbar-brand">
          New York Times Article Search
        </a>
      </div>
    </div>
  </nav>;

export default Nav;
