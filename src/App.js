import React, { Component } from "react";

import "./App.css";
import Sentence from "./containers/Sentence";
import FolderContents from "./containers/FolderContents"

const PICS_URL = "http://localhost:3002/api/v1/users/1";

class App extends Component {
  state = {
    allMyFolders: [],
    selectedPictures: []
  };

  componentDidMount() {
    this.getMyPics();
  }

  getMyPics = () => {
    return fetch(PICS_URL)
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
        <Sentence />
        {this.state.allMyFolders.map(f => <FolderContents folder={f}/> )}
      </div>
    );
  }
}

export default App;
