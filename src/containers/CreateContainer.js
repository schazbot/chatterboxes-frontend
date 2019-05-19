import React, { Component } from "react";
import NewFolderForm from "./NewFolderForm";
import Search from "../components/Search";
import FolderDropdown from "../components/FolderDropdown";
const FOLDER_PICTURES_PATH =
  "http://localhost:3002/api/v1/folder_pictures/create";
const PICTURES_PATH = "http://localhost:3002/api/v1/pictures/create";
class CreateContainer extends Component {
  token = null;
  state = {
    searchResults: [],
    searchTerm: "",
    folder_id: "",
    selectedSearchResult: {}
  };

  handleFolderSelectionChange = (e, { value }) => {
    this.setState({ folder_id: value });
  };

  handlePictureSelection = value => {
    this.setState({
      selectedSearchResult: { text: value.name, url: value.image_url }
    });
  };

  createFolderPicture = () => {
    return fetch(FOLDER_PICTURES_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folder_id: this.state.folder_id })
    })
  };

  createPicture = () => {
    return fetch(PICTURES_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: this.state.selectedSearchResult.text,
        url: this.state.selectedSearchResult.url
      })
    })
  };


  handleOnSubmit = () => {
    this.createPicture();
  };

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
          createPicture={this.createPicture}
          searchTerm={this.state.searchTerm}
          searchResults={this.state.searchResults}
          handleSearchQuery={this.handleSearchQuery}
          handleOnSubmit={this.handleOnSubmit}
          handlePictureSelection={this.handlePictureSelection}
        />
      </>
    );
  }
}

export default CreateContainer;
