import React, { Component } from "react";
import PictureCardModal from "../components/PictureCardModal";
import { Grid, Button, Label, Form, Input, Icon } from "semantic-ui-react";

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
      }).then(resp => resp.json())
    });
  };

  editPicture = () => {
    return fetch(EDIT_PICTURE_PATH + `${this.state.selectedPicture.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: this.state.picture.text
      })
    }).then(resp => resp.json())
    .then(editedPic => this.props.editedPicToFolder(editedPic))
  };

  deletePicture = () => {
    return fetch(EDIT_PICTURE_PATH + `${this.state.selectedPicture.id}`, {
      method: "DELETE"
    }).then(resp => resp.json())
    .then(deletedPic =>this.props.removePicFromFolder(deletedPic))
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

  resetPicture = () => {
    this.setState({
      selectedPicture: null
    })
  }

  render() {
    return (
      <Grid container celled className="folder-contents-container">
        <Grid.Row>
        <Form>
        <Label size={"big"}>
        <Icon name="edit outline" /> Edit folder name
          </Label>
          <Form.Field>
          
            <Input
            size='small' 
              onChange={this.handleFormChange}
              placeholder={this.props.folder.name}
            />   
              <Button onClick={this.editFolder} color={"green"}>
              Save
            </Button>
          </Form.Field>
          
        </Form>
        </Grid.Row>


        <Grid relaxed  container columns={6} textAlign={"center"}>
        <Label align right  size={"massive"}>
        <Icon name="edit outline" />Choose a picture to edit
        <Icon name="folder outline" />
        </Label>
          <Grid.Row>
            {this.props.folder.pictures.map(picture => (
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
            ))}
          </Grid.Row>
          <Button onClick={this.props.resetSelectedFolder}>Back</Button>
        </Grid>
      </Grid>
    );
  }
}
