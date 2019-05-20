import React, { Component } from "react";
import PictureCard from "../components/PictureCard";
import { Grid, Button } from "semantic-ui-react";

export default class FolderContents extends Component {
  render() {
    return (
      <div className="folder-contents-container">
      
        <Grid relaxed celled container columns={6} textAlign={"center"}>
          <Grid.Row>
            {this.props.folder.pictures.map(picture => (
              <Grid.Column key={picture.id}>
                <PictureCard
                  className="container-cell "
                  key={picture.id}
                  picture={picture}
                  handleClick={this.props.handleClick}
                />
              </Grid.Column>
            ))}
          </Grid.Row>
          <Button>Back</Button>
        </Grid>
      </div>
    );
  }
}
