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

const USER_URL = "https://chatterboxes-backend.herokuapp.com/api/v1/users/1";

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
    const { mySentence, selectedFolder, allMyFolders } = this.state

    return (
      <>
        <MenuBar resetSelectedFolder={this.resetSelectedFolder}
          selectedFolder={selectedFolder} />
        <Route
          exact
          path="/"
          render={() => {
            return (
              <Grid className="folder-container" container centered>
                <Grid.Row>
                  <Sentence
                    mySentence={mySentence}
                    handleClick={this.removeFromSentence}
                    clearSentence={this.clearSentence}
                  />
                </Grid.Row>
                {selectedFolder ? (
                  <>
                    <Grid.Row>
                      <FolderContents
                        folder={selectedFolder}
                        handleClick={this.addToSentence}
                        mySentence={mySentence}
                        resetSelectedFolder={this.resetSelectedFolder}
                      />
                    </Grid.Row>
                  </>
                ) : (
                    <>
                      <Grid container columns={4}>
                        <Grid.Row>
                          {allMyFolders.map(folder => (
                            <Grid.Column mobile={4} tablet={6} computer={2} key={folder.name}>
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
                allMyFolders={allMyFolders}
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
                  {selectedFolder ? (
                    <>
                      <FolderContentsEdit
                        folder={selectedFolder}
                        resetSelectedFolder={this.resetSelectedFolder}
                        deletePicture={this.deletePicture}
                        updatePicture={this.updatePicture}
                        selectedFolder={selectedFolder}
                        deleteFolder={this.deleteFolder}
                        updateFolder={this.updateFolder}
                      />
                    </>
                  ) : (
                      <>
                        <Label size={"massive"}>
                          <Icon name="folder outline" />
                          Choose a folder to edit
                      </Label>
                        <Grid container columns={4}>
                          <Grid.Row>
                            {allMyFolders.map(folder => (
                              <Grid.Column mobile={4} tablet={6} computer={2} key={folder.name}>
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
      </>
    );
  }

  addToSentence = picture => {
    const { mySentence} = this.state
    if (!mySentence.includes(picture))
      this.setState({ mySentence: [...mySentence, picture] });
  };

  removeFromSentence = picture => {
    const { mySentence} = this.state
    let filteredPictures = mySentence.filter(
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
    debugger
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
    this.setState({
      allMyFolders: [...this.state.allMyFolders, newFolder]
    })

  };

  updateFolder = updatedFolder => {
    const { selectedFolder, allMyFolders } = this.state;

    this.setState({
      allMyFolders: allMyFolders.map(f =>
        f.id === selectedFolder.id ? updatedFolder : f
      )
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
