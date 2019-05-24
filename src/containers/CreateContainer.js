import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import NewFolderForm from "./NewFolderForm";
import APICard from "../components/APICard";
import FolderDropdown from "../components/FolderDropdown";
import SearchComponent from "../components/SearchComponent";

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
    this.setState(
      {
        selectedSearchResult: { text: value.name, url: value.image_url }
      },
      this.createPicture
    );
  };

  createPicture = () => {
    return fetch(PICTURES_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        folder_id: this.state.folder_id,
        text: this.state.selectedSearchResult.text,
        url: this.state.selectedSearchResult.url
      })
    })
      .then(resp => resp.json())
      .then(newPicture =>
        this.props.addPicToFolder(newPicture, this.state.folder_id)
      );
  };

  handleOnSubmit = () => {
    this.handlePictureSelection();
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
      <Grid className="main-grid" relaxed celled>
        <Grid.Row columns={2}>
          <Grid.Column>
            <NewFolderForm
              allMyFolders={this.props.allMyFolders}
              updateFolders={this.props.updateFolders}
            />
          </Grid.Column>

          <Grid.Column relaxed>
            <Grid.Row>
              <FolderDropdown
                folderId={this.state.folder_id}
                allMyFolders={this.props.allMyFolders}
                handleFolderSelectionChange={this.handleFolderSelectionChange}
              />
            </Grid.Row>

            <Grid.Row relaxed>
              <SearchComponent
                className="search-api-bar"
                createPicture={this.createPicture}
                searchTerm={this.state.searchTerm}
                searchResults={this.state.searchResults}
                handleSearchQuery={this.handleSearchQuery}
                handleOnSubmit={this.handleOnSubmit}
                handlePictureSelection={this.handlePictureSelection}
              />
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row relaxed columns={6}>
          {this.state.searchResults.map(picture => (
            <Grid.Column relaxed width={2}>
              <APICard
                picture={picture}
                key={picture.id}
                handlePictureSelection={this.handlePictureSelection}
                createPicture={this.props.createPicture}
                handleOnSubmit={this.handleOnSubmit}
              />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    );
  }
}

export default CreateContainer;
