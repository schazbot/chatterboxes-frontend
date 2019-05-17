import React, { Component } from "react";
import APICard from "./APICard";
// const OPEN_SYMBOL_SEARCH =
//   "https://www.opensymbols.org/api/v1/symbols/search?q=";

// class Search extends Component {

//     state ={
//         searchTerm: "",
//         searchResults: []
//     }

//   searchOpenSymbols = () => {
//     return fetch(OPEN_SYMBOL_SEARCH + `${this.state.searchTerm}`)
//       .then(resp => resp.json())
//       .then(data =>
//         this.setState({
//           searchResults: data
//         })
//       );
//   };

//   render() {
//     return (
//       <div className="ui form" onSubmit={this.searchOpenSymbols}>
//         <div className="ui icon input">
//           <input
//             className="prompt"
//             type="text"
//             value={this.state.searchTerm}
//             onChange={e => this.updateSearchTerm(e.target.value)}
//           />
//            <button className="ui button" type="submit" >Search</button>
//         </div>
//       </div>
//     );
//   }

//   updateSearchTerm = searchTerm => {
//     this.setState({ searchTerm: searchTerm });
//   };

// }

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
