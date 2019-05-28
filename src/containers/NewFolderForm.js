import React, { Component } from "react";
import { Button, Form, Label, Icon, Grid } from "semantic-ui-react";

const NEW_FOLDER_URL = "https://chatterboxes-backend.herokuapp.com/api/v1/folders";

class NewFolderForm extends Component {
  state = {
    user_id: 1,
    name: "",
    image_url: ""
  };

  createNewFolder = () => {
    return fetch(NEW_FOLDER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state)
    })
      .then(resp => resp.json())
      .then(newFolder => this.props.updateFolders(newFolder)
      )
  };

  resetFormState = () => {
    this.setState({ user_id: 1, name: "", image_url: "" });
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };
  handleUrlChange = e => {
    this.setState({ image_url: e.target.value });
  };

  render() {
    return (
      <Grid columns={1}>
        <Grid.Row>
          <Label pointing={"below"}>
            <Icon name="folder outline" size="big" /> Create new Folder
          </Label>
        </Grid.Row>
        <Grid.Row>
          <Form onSubmit={this.createNewFolder}>
            <Form.Field inline>
              <input
                type="text"
                id="name"
                onChange={event => this.handleNameChange(event)}
                value={this.state.name}
                placeholder="Folder Name"
              />
              <Label pointing="left">Name</Label>
            </Form.Field>
            <Form.Field inline>
              <input
                type="text"
                id="image"
                onChange={event => this.handleUrlChange(event)}
                placeholder="Add image url"
                value={this.state.image_url}
              />
              <Label pointing="left">Image Url</Label>
            </Form.Field>
            <Button positive type="submit">
              Submit
            </Button>
          </Form>
        </Grid.Row>
      </Grid>
    );
  }
}

export default NewFolderForm;
