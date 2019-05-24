import React, { Component } from "react";
import { Route } from "react-router-dom";

import "./App.css";
import { Grid, Label, Icon } from "semantic-ui-react";

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
      <div className="app-container">
        <MenuBar setFolder={this.setFolder}
        selectedFolder={this.state.selectedFolder}/>
        <Route
          exact
          path="/home"
          render={() => (
            <>
              <Grid container>
                <Grid.Row>
                  <Sentence
                    mySentence={this.state.mySentence}
                    handleClick={this.removeFromSentence}
                    clearSentence={this.clearSentence}
                  />
                </Grid.Row>
                <Grid.Row>
              
                </Grid.Row>
              </Grid>
            </>
          )}
        />

        <Route
          exact
          path="/folders"
          render={() => {
            return (
              <Grid className="folder-container" container>
                <Grid.Row>
                  <Sentence
                    mySentence={this.state.mySentence}
                    handleClick={this.removeFromSentence}
                    clearSentence={this.clearSentence}
                  />
                </Grid.Row>
                {this.state.selectedFolder ? (
                  <>
                    <Grid.Row>
                      <FolderContents
                        folder={this.state.selectedFolder}
                        handleClick={this.addToSentence}
                        mySentence={this.state.mySentence}
                        resetSelectedFolder={this.resetSelectedFolder}
                      />
                    </Grid.Row>
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
              </Grid>
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
                updateFolders={this.updateFolders}
              />
            </>
          )}
        />
        <Route
          exact
          path="/edit"
          render={() => (
            <>
              <Grid container centered>
                <Grid.Row>
                  {this.state.selectedFolder ? (
                    <>
                      <FolderContentsEdit
                        folder={this.state.selectedFolder}
                        resetSelectedFolder={this.resetSelectedFolder}
                        deletePicture={this.deletePicture}
                        updatePicture={this.updatePicture}
                        selectedFolder={this.state.selectedFolder}
                        deleteFolder={this.deleteFolder}
                      />
                    </>
                  ) : (
                    <>
                      <Label size={"massive"}>
                        <Icon name="folder outline" />
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
                </Grid.Row>
              </Grid>
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

  updateFolders = newFolder => {
    debugger
    this.setState({
      allMyFolders: [...this.state.allMyFolders, newFolder]
    });
  };

  deletePicture = picture => {
    const { selectedFolder, allMyFolders } = this.state;

    const updatedPictures = selectedFolder.pictures.filter(
      p => p.id !== picture.id
    );
    const updatedFolder = { ...selectedFolder, pictures: updatedPictures };
    this.setState({
      selectedFolder: updatedFolder,
      allMyFolders: allMyFolders.map(f =>
        f.id === selectedFolder.id ? updatedFolder : f
      )
    });
  };

  updatePicture = picture => {
    const { selectedFolder, allMyFolders } = this.state;

    const updatedPictures = selectedFolder.pictures.map(p =>
      p.id === picture.id ? picture : p
    );
    const updatedFolder = { ...selectedFolder, pictures: updatedPictures };
    this.setState({
      selectedFolder: updatedFolder,
      allMyFolders: allMyFolders.map(f =>
        f.id === selectedFolder.id ? updatedFolder : f
      )
    });
  };

  deleteFolder = folder => {
    const { allMyFolders } = this.state;

    const updatedFolders = allMyFolders.filter(f => f.id !== folder.id);
    this.setState({
      allMyFolders: updatedFolders
    });
    this.resetSelectedFolder();
  };

  setFolder = selectedFolder => {
    this.setState({ selectedFolder });
  };
  resetSelectedFolder = () => {
    this.setState({ selectedFolder: null });
  };
}
