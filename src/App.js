import React, { Component } from "react";
import "./App.css";
import MenuBar from "./components/MenuBar";
import Search from "./components/Search";
import SearchForm from "./containers/SearchForm";
import Sentence from "./containers/Sentence";
import FolderCard from "./components/FolderCard";
import FolderContents from "./containers/FolderContents";
import { Route } from "react-router-dom";

const USER_URL = "http://localhost:3002/api/v1/users/1";

export default class App extends Component {
  state = {
    allMyFolders: [],
    selectedFolder: null,
    mySentence: [],
    selectedPicture: null,
    searchTerm: ""
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
          component={() => {
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
                        handleClick={this.showFolder}
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
          path="/search"
          render={() =>
              <>
                <Search
                  searchTerm={this.state.searchTerm}
                  updateSearchTerm={this.updateSearchTerm}
                />
              </>
          }
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

  showFolder = selectedFolder => {
    this.setState({ selectedFolder: selectedFolder });
  };

  updateSearchTerm = searchTerm => {
    this.setState({ searchTerm: searchTerm });
  };
}
