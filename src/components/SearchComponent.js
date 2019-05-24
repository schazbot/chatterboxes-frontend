import React, { Component } from "react";
import {Search} from "semantic-ui-react"

export default class SearchComponent extends Component {
  render() {
    return (
      <>
        <form className="ui search">
          <input
            type="text"
            placeholder="Search for..."
            onChange={this.props.handleSearchQuery}
          />
        </form>

        {/* <Search type="text"
            placeholder="Search for..."
            onChange={this.props.handleSearchQuery}/> */}
      </>
    );
  }
}
