import React, { Component } from "react";
import PictureCardModal from "../components/PictureCardModal";
import { Grid, Button, Label, Form } from "semantic-ui-react";

const EDIT_FOLDER_PATH = "http://localhost:3002/api/v1/folders/";
const EDIT_PICTURE_PATH = "http://localhost:3002/api/v1/pictures/";

export default class FolderContents extends Component {
  state = {
    selectedPicture: null,
    folder: { name: "" },
    picture: {
      text: ""
    }
  };

  editFolder = () => {
    return fetch(EDIT_FOLDER_PATH + `${this.props.folder.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.folder.name
      })
    });
  };

  editPicture = () => {
    return fetch(EDIT_PICTURE_PATH + `${this.state.selectedPicture.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: this.state.picture.text
      })
    }).then(alert("Text saved!"));
  };

  deletePicture = () => {
    return fetch(EDIT_PICTURE_PATH + `${this.state.selectedPicture.id}`, {
      method: "DELETE"
    }).then(alert("Picture deleted!"));
  };

  handleFormChange = e => {
    const { value } = e.target;
    this.setState({ folder: { name: value } });
  };

  handlePictureFormChange = e => {
    const { value } = e.target;
    this.setState({ picture: { text: value } });
  };

  setPicture = selectedPicture => {
    this.setState({ selectedPicture: selectedPicture });
  };

  render() {
    return (
      <div className="folder-contents-container">
        <Form>
          <Form.Field>
            <Label pointing="down" size={"massive"}>
              Edit folder name
            </Label>
            <input
              onChange={this.handleFormChange}
              placeholder={this.props.folder.name}
            />
            <Button onClick={this.editFolder} color={"red"}>
              Save
            </Button>
          </Form.Field>
        </Form>

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
                  setPicture={this.setPicture}
                  editPicture={this.editPicture}
                  deletePicture={this.deletePicture}
                  handlePictureFormChange={this.handlePictureFormChange}
                />
              </Grid.Column>
            ))}
          </Grid.Row>
          <Button onClick={this.props.resetSelectedFolder}>Back</Button>
        </Grid>
      </div>
    );
  }
}
