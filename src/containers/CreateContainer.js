import React, { Component } from "react";
import NewFolderForm from "./NewFolderForm";
import Search from "../components/Search";
import FolderDropdown from "../components/FolderDropdown";
class CreateContainer extends Component {
  token = null;
  state = {
    folder_id: "",
    searchTerm: "",
    searchResults: [],
    selectedSearchResult: null
  };

  handleFolderSelectionChange = (e, { value }) => {
    this.setState({ folder_id: value });
  };

  handlePictureSelection = (value) => {
    this.setState({ selectedSearchResult:{text: value.name,
    url: value.image_url} });
  }

  handleSearchQuery = e => {
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
        <NewFolderForm />
        <FolderDropdown
          allMyFolders={this.props.allMyFolders}
          handleFolderSelectionChange={this.handleFolderSelectionChange}
        />
        <Search
          searchTerm={this.state.searchTerm}
          searchResults={this.state.searchResults}
          handleSearchQuery={this.handleSearchQuery}
          handlePictureSelection={this.handlePictureSelection}
        />
      </>
    );
  }
}

export default CreateContainer;
