import React, { Component } from "react";
import APICard from "./APICard";

export default class Search extends Component {
  token = null;
  state = {
    searchTerm: "",
    searchResults: []
  };

  onChange = e => {
    const { value } = e.target;
    this.setState({
      searchTerm: value
    });

    this.search(value);
  };

  search = query => {
    const url = `https://www.opensymbols.org/api/v1/symbols/search?q=${query}`;
    const token = {};
    this.token = token;

    fetch(url)
      .then(results => results.json())
      .then(data => {
        if (this.token === token) {
          this.setState({ searchResults: data });
        }
      });
  };

  componentDidMount() {
    this.search("");
  }

  render() {
    return (
      <>
        <form>
          <input
            type="text"
            className="search-box"
            placeholder="Search for..."
            onChange={this.onChange}
          />
        </form>
        {this.state.searchResults.map(picture => (
          <APICard picture={picture} key={picture.id} />
        ))}
      </>
    );
  }
}
