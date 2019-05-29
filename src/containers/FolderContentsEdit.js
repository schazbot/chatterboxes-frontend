import React, { Component } from "react";
import PictureCardModal from "../components/PictureCardModal";
import { Grid, Button, Label, Form, Input, Icon } from "semantic-ui-react";

const EDIT_FOLDER_PATH = "http://localhost:3002/api/v1/folders/";
const EDIT_PICTURE_PATH = "http://localhost:3002/api/v1/pictures/";

export default class FolderContentsEdit extends Component {
  state = {
    selectedPicture: null,
    folder: { name: "" },
    picture: {
      text: ""
    }
  };

  deletePicture = () => {
    return fetch(EDIT_PICTURE_PATH + `${this.state.selectedPicture.id}`, {
      method: "DELETE"
    })
      .then(resp => resp.json())
      .then(deletedPic => this.props.deletePicture(deletedPic));
  };

  editPicture = () => {
    return fetch(EDIT_PICTURE_PATH + `${this.state.selectedPicture.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: this.state.picture.text
      })
    })
      .then(resp => resp.json())
      .then(editedPic => this.props.updatePicture(editedPic));
  };

  setPicture = selectedPicture => {
    this.setState({ selectedPicture: selectedPicture });
  };

  deleteFolderFromApi = () => {
    return fetch(EDIT_FOLDER_PATH + `${this.props.selectedFolder.id}`, {
      method: "DELETE"
    })
      .then(resp => resp.json())
      .then(deletedFolder => this.props.deleteFolder(deletedFolder));
  };

  editFolder = () => {
    return fetch(EDIT_FOLDER_PATH + `${this.props.folder.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.folder.name
      })
    }).then(resp => resp.json()).then(editedFolder => this.props.updateFolder(editedFolder));
  };

  handleFormChange = e => {
    const { value } = e.target;
    this.setState({ folder: { name: value } });
  };

  handlePictureFormChange = e => {
    const { value } = e.target;
    this.setState({ picture: { text: value } });
  };

  render() {
    return (
      <Grid container className="folder-contents-container">
        <Grid.Column width={4}>
          <Grid.Row>
            <Form>
              <Label pointing={"below"} size={"big"}>
                <Icon name="edit outline" />
                Edit folder name
              </Label>
              <Form.Field>
                <Input
                  size="small"
                  onChange={this.handleFormChange}
                  placeholder={this.props.folder.name}
                />
                <Button onClick={this.editFolder} color={"green"}>
                  <Icon name="save" />
                  Save
                </Button>
              </Form.Field>
            </Form>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={9}>
          <Grid relaxed container columns={5} textAlign={"center"}>
            <Label size={"massive"}>
              <Icon name="edit outline" />
              Choose a picture to edit
            </Label>
            <Grid.Row>
              {this.props.folder.pictures ? (this.props.folder.pictures.map(picture => (
                <Grid.Column key={picture.id}>
                  <PictureCardModal
                    className="container-cell "
                    key={picture.id}
                    picture={picture}
                    setPicture={this.setPicture}
                    editPicture={this.editPicture}
                    editedPicToFolder={this.props.editedPicToFolder}
                    deletePicture={this.deletePicture}
                    handlePictureFormChange={this.handlePictureFormChange}
                  />
                </Grid.Column>
              ))) : null}
            </Grid.Row>

            <Button onClick={this.props.resetSelectedFolder}>
              <Icon name="backward" />
              Back
            </Button>
          </Grid>
        </Grid.Column>
        <Grid.Column width={3}>
          <Label pointing={"below"} size={"big"}>
            <Icon name="trash" />
            Delete folder
          </Label>
          <Button onClick={this.deleteFolderFromApi} color={"red"}>
            {" "}
            <Icon name="trash" />
            Delete
          </Button>
        </Grid.Column>
      </Grid>
    );
  }
}
