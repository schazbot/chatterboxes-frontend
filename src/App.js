import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";

import MenuBar from "./components/MenuBar";
import CreateContainer from "./containers/CreateContainer";
import Sentence from "./containers/Sentence";
import FolderCard from "./components/FolderCard";
import FolderContents from "./containers/FolderContents";

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

        <Sentence
          mySentence={this.state.mySentence}
          handleClick={this.removeFromSentence}
          clearSentence={this.clearSentence}
        />

        <Route
          exact
          path="/"
          render={() => {
            return (
              <div>
                {this.state.selectedFolder ? (
                  <>
                    <FolderContents
                      folder={this.state.selectedFolder}
                      handleClick={this.addToSentence}
                      mySentence={this.state.mySentence}
                    />
                  </>
                ) : (
                  <>
                    {this.state.allMyFolders.map(folder => (
                      <FolderCard
                        key={folder.id}
                        folder={folder}
                        handleClick={this.setFolder}
                      />
                    ))}
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
              <CreateContainer allMyFolders={this.state.allMyFolders} />
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

  setFolder = selectedFolder => {
    this.setState({ selectedFolder });
  };
}
