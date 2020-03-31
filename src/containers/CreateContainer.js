import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import NewFolderForm from "./NewFolderForm";
import APICard from "../components/APICard";
import FolderDropdown from "../components/FolderDropdown";
import SearchComponent from "../components/SearchComponent";
import Api from "../Api";

const PICTURES_PATH = "https://chatterboxes-backend.herokuapp.com/api/v1/pictures/create";

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
    const { selectedSearchResult, folder_id } = this.state
    const { addPicToFolder } = this.props
    Api.post(PICTURES_PATH, {
      folder_id: folder_id,
      text: selectedSearchResult.text,
      url: selectedSearchResult.url
    }).then(newPicture =>
      addPicToFolder(newPicture, folder_id)
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

    Api.get(url)
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
    const { folder_id, searchTerm, searchResults } = this.state
    const { allMyFolders, updateFolders } = this.props
    const { handleFolderSelectionChange, createPicture, handleSearchQuery, handleOnSubmit, handlePictureSelection} = this
    return (
      <Grid className="main-grid" container>
        <Grid.Row columns={2}>
          <Grid.Column>
            <NewFolderForm
              {...{ allMyFolders, updateFolders }}
            />
          </Grid.Column>

          <Grid.Column >
            <FolderDropdown
              folderId={folder_id}
              {...{ handleFolderSelectionChange, allMyFolders }}
            />
            <Grid.Row>
              <SearchComponent
                {...{ createPicture, searchTerm, searchResults, handleSearchQuery, handleOnSubmit, handlePictureSelection }}
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
                {...{ handlePictureSelection, handleOnSubmit }}
              />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    );
  }
}

export default CreateContainer;
