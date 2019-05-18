import React, { Component } from "react";
import APICard from "./APICard";

export default class Search extends Component {


  render() {
    return (
      <>
        <form>
          <input
            type="text"
            className="search-box"
            placeholder="Search for..."
            onChange={this.props.handleSearchQuery}
          />
        </form>
        {this.props.searchResults.map(picture => (
          <APICard picture={picture} key={picture.id} />
        ))}
      </>
    );
  }
}
