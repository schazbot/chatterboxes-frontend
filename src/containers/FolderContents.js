import React, { Component } from "react";
import PictureCard from "../components/PictureCard";
import { Grid, Button } from "semantic-ui-react";

export default class FolderContents extends Component {
  render() {
    const {folder, handleClick, resetSelectedFolder} = this.props
    return (
      <div className="folder-contents-container">
      
        <Grid container columns={6} textAlign={"center"}>
          <Grid.Row>
            {folder.pictures? (folder.pictures.map(picture => (
              <Grid.Column key={picture.id}>
                <PictureCard
                  className="container-cell "
                  key={picture.id}
                  picture={picture}
                  handleClick={handleClick}
                  />
              </Grid.Column>
            ))) : null}
          </Grid.Row>
          <Button onClick={resetSelectedFolder}>Back</Button>
        </Grid>
      </div>
    );
  }
}
