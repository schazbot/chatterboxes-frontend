import React, { Component } from "react";

import "./App.css";
import Sentence from "./containers/Sentence";

const PICS_URL = "https://www.opensymbols.org/api/v1/symbols/search?q=apple";

class App extends Component {
  state = {
    allMyPictures: [],
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
          allMyPictures: data
        })
      );
  };

  render() {
    return (
      <div>
        <Sentence allMyPictures={this.state.allMyPictures}/>
        
      </div>
    );
  }
}

export default App;
