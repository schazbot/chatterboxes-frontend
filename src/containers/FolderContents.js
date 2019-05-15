import React, { Component } from "react";
import PictureCard from "../components/PictureCard";
import { Grid, Image } from "semantic-ui-react";

export default class FolderContents extends Component {
  render() {
    return (
      <div className="folder-contents-container">
        <Grid container columns={3} textAlign={"center"}>
          {this.props.folder.pictures.map(picture => (
            <Grid.Column>
              <PictureCard className="container-cell " picture={picture} />
            </Grid.Column>
          ))}
        </Grid>
      </div>
    );
  }
}
