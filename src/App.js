import React, { Component } from "react";

import "./App.css";
// import Menu from "./components/MenuBar"
import Sentence from "./containers/Sentence";
import FolderContents from "./containers/FolderContents";

const USER_URL = "http://localhost:3002/api/v1/users/1";

export default class App extends Component {
  state = {
    allMyFolders: [],
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
        <Sentence mySentence={this.state.mySentence} />
        {this.state.allMyFolders.map(f => (
          <FolderContents folder={f} handleClick={this.addToSentence} mySentence={this.state.mySentence}/>
        ))}
      </div>
    );
  }

  addToSentence = picture => {
    if (!this.state.mySentence.includes(picture))
      this.setState({ mySentence: [...this.state.mySentence, picture] });
  };

  // removeFromSentence = picture => {
  //   let filteredPictures = this.state.mySentence.filter(
  //     pic => pic.id !== picture.id
  //   );
  //   this.setState({ mySentence: filteredPictures });
  // };

  selectPicture = (selectedPicture) => {
    this.setState({ selectedPicture: selectedPicture });
    
  };

  // deselectPicture = () => {this.setState({selectedPicture : null})}




}
