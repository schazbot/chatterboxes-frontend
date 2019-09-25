import React, { Component } from "react";
import PictureCardModal from "../components/PictureCardModal";
import { Grid, Button, Label, Form, Input, Icon, Message } from "semantic-ui-react";
import Api from "../Api";
const EDIT_FOLDER_PATH = "https://chatterboxes-backend.herokuapp.com/api/v1/folders/";
const EDIT_PICTURE_PATH = "https://chatterboxes-backend.herokuapp.com/api/v1/pictures/";

export default class FolderContentsEdit extends Component {
  state = {
    message: "",
    selectedPicture: null,
    folder: { name: "" },
    picture: {
      text: ""
    }
  };



  deletePicture = () => {
    const { selectedPicture } = this.state
    const { deletePicture } = this.props
    Api.destroy(EDIT_PICTURE_PATH, selectedPicture.id)
      .then(deletedPic => deletePicture(deletedPic));
  };

  editPicture = () => {
    const { selectedPicture, picture } = this.state
    const { updatePicture } = this.props
    Api.patch(EDIT_PICTURE_PATH, selectedPicture.id, {
      text: picture.text
    }
    ).then(editedPic => updatePicture(editedPic));
  };

  setPicture = selectedPicture => {
    this.setState({ selectedPicture: selectedPicture });
  };

  deleteFolderFromApi = () => {
    const { selectedFolder, deleteFolder } = this.props

    Api.destroy(EDIT_FOLDER_PATH, selectedFolder.id)
      .then(deletedFolder => deleteFolder(deletedFolder));
  };

  editFolder = () => {
    const { folder, updateFolder } = this.props

    Api.patch(EDIT_FOLDER_PATH, folder.id, {
      name: this.state.folder.name
    }).then(editedFolder => {
      if (editedFolder.error) {
        this.setState({ error: editedFolder.error });
      } else {
        updateFolder(editedFolder);
        this.setState({ message: "saved!" });
      }
    });
  };

  handleFormChange = e => {
    const { value } = e.target;
    this.setState({ folder: { name: value } });
  };

  handlePictureFormChange = e => {
    const { value } = e.target;
    this.setState({ picture: { text: value } });
  };

  resetErrors = () => {
    this.setState({ error: "", message: "" });
  };

  render() {
    const { folder, editedPicToFolder, resetSelectedFolder } = this.props
    const { message } = this.state

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
                  placeholder={folder.name}
                />
                <Button onClick={this.editFolder} color={"green"}>
                  <Icon name="save" />
                  Save
                </Button>
              </Form.Field>
            </Form>
          </Grid.Row>
          {message !== "" ? (
            <Message onDismiss={this.resetErrors} positive>
              {message}
            </Message>
          ) : null}
        </Grid.Column>
        <Grid.Column width={9}>
          <Grid relaxed container columns={5} textAlign={"center"}>
            <Label size={"massive"}>
              <Icon name="edit outline" />
              Choose a picture to edit
            </Label>
            <Grid.Row>
              {folder.pictures
                ? folder.pictures.map(picture => (
                  <Grid.Column
                    mobile={2}
                    tablet={4}
                    computer={4}
                    key={picture.id}
                  >
                    <PictureCardModal
                      className="container-cell "
                      key={picture.id}
                      picture={picture}
                      setPicture={this.setPicture}
                      editPicture={this.editPicture}
                      editedPicToFolder={editedPicToFolder}
                      deletePicture={this.deletePicture}
                      handlePictureFormChange={this.handlePictureFormChange}
                    />
                  </Grid.Column>
                ))
                : null}
            </Grid.Row>

            <Button size={"tiny"} onClick={resetSelectedFolder}>
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
            <Icon name="trash" />
            Delete
          </Button>
        </Grid.Column>
      </Grid>
    );
  }
}
