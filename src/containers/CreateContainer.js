import React, { Component } from "react";
import { Grid, Label } from "semantic-ui-react";

import NewFolderForm from "./NewFolderForm";
import APICard from "../components/APICard";
import FolderDropdown from "../components/FolderDropdown";
import SearchComponent from "../components/SearchComponent";

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
    });
  };

  createPicture = () => {
    return fetch(PICTURES_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: this.state.selectedSearchResult.text,
        url: this.state.selectedSearchResult.url
      })
    });
  };

  handleOnSubmit = () => {
    this.createPicture();
    this.createFolderPicture();
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
      <Grid className="main-grid" relaxed celled >
        <Grid.Row columns={2} divided relaxed>
          <Grid.Column >
            <NewFolderForm />
          </Grid.Column>

          <Grid.Column relaxed >
          
            
            <Grid.Row>
              <FolderDropdown
                allMyFolders={this.props.allMyFolders}
                handleFolderSelectionChange={this.handleFolderSelectionChange}
              />
            </Grid.Row>
            <Grid.Row relaxed>
              <SearchComponent
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
                handlePictureSelection={this.props.handlePictureSelection}
                createPicture={this.props.createPicture}
                handleOnSubmit={this.props.handleOnSubmit}
              />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    );
  }
}

export default CreateContainer;
