import React, { Component } from "react";

export default class SearchComponent extends Component {
  render() {
    return (
      <>
        <form className="ui search">
          <input
            type="text"
            className="search-box"
            placeholder="Search for..."
            onChange={this.props.handleSearchQuery}
          />
        </form>
      </>
    );
  }
}
