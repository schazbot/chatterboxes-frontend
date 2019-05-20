import React, { Component } from "react";
import PictureCardModal from "../components/PictureCardModal";
import { Grid, Button, Label, Modal } from "semantic-ui-react";

export default class FolderContents extends Component {
  render() {
    return (
      <div className="folder-contents-container">
        <Label pointing="down" size={"massive"}>
          Choose a picture to edit
        </Label>
        <Grid relaxed celled container columns={6} textAlign={"center"}>
          <Grid.Row>
            {this.props.folder.pictures.map(picture => (
              <Grid.Column key={picture.id}>
                <PictureCardModal
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
