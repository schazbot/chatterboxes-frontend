import React, { Component } from "react";

import "./App.css";
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
        <Sentence
          mySentence={this.state.mySentence}
          handleClick={this.removeFromSentence}
          clearSentence={this.clearSentence}
        />

        {this.state.selectedFolder ? (
          <>
            <FolderContents
            folder={this.state.selectedFolder}
            handleClick={this.state.selectFolder}  
            mySentence={this.state.mySentence}
            />
          </>
        ) : (
          <>
            {this.state.allMyFolders.map(folder => (
              <FolderCard folder={folder}
              handleClick={this.showFolder} />
            ))}
          </>
        )}
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

  showFolder = selectedFolder => {
    this.setState({ selectedFolder: selectedFolder });
  };
}
