import React, { Component } from "react";
import PictureCardModal from "../components/PictureCardModal";
import { Grid, Button, Label, Form } from "semantic-ui-react";

const EDIT_FOLDER_PATH = "http://localhost:3002/api/v1/folders/"

export default class FolderContents extends Component {
  state = {
    folder: { name: "" },
    picture: { text: "" }
  };

  editPicture = () => {
    return fetch(EDIT_FOLDER_PATH, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: this.state.picture.text
      })
    });
  };

  render() {
    return (
      <div className="folder-contents-container">
        <Form>
          <Form.Field>
            <Label pointing="down" size={"massive"}>
              Edit folder name
            </Label>
            <input placeholder={this.props.folder.name} />
            <Button color={"red"}>Save</Button>
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
