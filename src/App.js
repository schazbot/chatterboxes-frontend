import React, { Component } from "react";
import { Route } from "react-router-dom";

import "./App.css";
import { Grid, Label } from "semantic-ui-react";

import MenuBar from "./components/MenuBar";
import CreateContainer from "./containers/CreateContainer";
import Sentence from "./containers/Sentence";
import FolderCard from "./components/FolderCard";
import FolderContents from "./containers/FolderContents";
import FolderContentsEdit from "./containers/FolderContentsEdit";

const USER_URL = "http://localhost:3002/api/v1/users/1";

export default class App extends Component {
  state = {
    allMyFolders: [],
    selectedFolder: null,
    mySentence: [],
    selectedPicture: null
  };

  componentDidMount() {
    this.getMyPics();
  }

  getMyPics = () => {
    return fetch(USER_URL)
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          allMyFolders: data.folders
        })
      );
  };

  render() {
    return (
      <div>
        <MenuBar />

        <Route
          exact
          path="/home"
          render={() => {
            return (
              <div>
                <Sentence
                  mySentence={this.state.mySentence}
                  handleClick={this.removeFromSentence}
                  clearSentence={this.clearSentence}
                />
                {this.state.selectedFolder ? (
                  <>
                    <FolderContents
                      folder={this.state.selectedFolder}
                      handleClick={this.addToSentence}
                      mySentence={this.state.mySentence}
                      resetSelectedFolder={this.resetSelectedFolder}
                    />
                  </>
                ) : (
                  <>
                    <Grid container columns={6}>
                      <Grid.Row>
                        {this.state.allMyFolders.map(folder => (
                          <Grid.Column key={folder.name}>
                            <FolderCard
                              key={folder.id}
                              folder={folder}
                              handleClick={this.setFolder}
                            />
                          </Grid.Column>
                        ))}
                      </Grid.Row>
                    </Grid>
                  </>
                )}
              </div>
            );
          }}
        />
        <Route
          exact
          path="/add"
          render={() => (
            <>
              <CreateContainer
                getMyPics={this.getMyPics}
                allMyFolders={this.state.allMyFolders}
                addPicToFolder={this.addPicToFolder}
              />
            </>
          )}
        />
        <Route
          exact
          path="/edit"
          render={() => (
            <>
              {this.state.selectedFolder ? (
                <>
                  <FolderContentsEdit
                    folder={this.state.selectedFolder}
                    handleClick={this.addToSentence}
                    mySentence={this.state.mySentence}
                    resetSelectedFolder={this.resetSelectedFolder}
                  />
                </>
              ) : (
                <>
                  <Label pointing="down" size={"massive"}>
                    Choose a folder to edit
                  </Label>
                  <Grid container columns={6}>
                    <Grid.Row>
                      {this.state.allMyFolders.map(folder => (
                        <Grid.Column key={folder.name}>
                          <FolderCard
                            key={folder.id}
                            folder={folder}
                            handleClick={this.setFolder}
                          />
                        </Grid.Column>
                      ))}
                    </Grid.Row>
                  </Grid>
                </>
              )}
            </>
          )}
        />
      </div>
    );
  }

  addToSentence = picture => {
    if (!this.state.mySentence.includes(picture))
      this.setState({ mySentence: [...this.state.mySentence, picture] });
  };

  removeFromSentence = picture => {
    let filteredPictures = this.state.mySentence.filter(
      pic => pic.id !== picture.id
    );
    this.setState({ mySentence: filteredPictures });
  };

  clearSentence = e => {
    e.preventDefault();
    this.setState({
      mySentence: []
    });
  };

  addPicToFolder = (newPicture, folder_id) => {
    const replacementFolder = this.state.allMyFolders.find(
      folder => folder.id === folder_id
    );

    const newReplacementFolder = {
      ...replacementFolder,
      pictures: [...replacementFolder.pictures, newPicture]
    };
    this.setState({
      allMyFolders: [
        ...this.state.allMyFolders.filter(folder => folder.id !== folder_id),
        newReplacementFolder
      ]
    });
  };

  setFolder = selectedFolder => {
    this.setState({ selectedFolder });
  };
  resetSelectedFolder = () => {
    this.setState({ selectedFolder: null });
  };
}
