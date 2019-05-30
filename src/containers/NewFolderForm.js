import React, { Component } from "react";
import { Button, Form, Label, Icon, Grid, Message } from "semantic-ui-react";

const NEW_FOLDER_URL = "https://chatterboxes-backend.herokuapp.com/api/v1/folders";

class NewFolderForm extends Component {
  state = {
    user_id: 1,
    name: "",
    image_url: "",
    error: "",
    message: ""
  };

  createNewFolder = () => {
    return fetch(NEW_FOLDER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: 1,
        name: this.state.name,
        image_url: this.state.image_url
      })
    })
      .then(resp => resp.json())
      .then(newFolder => {
        if (newFolder.error) {
          this.setState({ error: newFolder.error });
        } else {
          this.props.updateFolders(newFolder);
          this.setState({ message: "saved!" });
        }
      });
  };

  resetFormState = () => {
    this.setState({ user_id: 1, name: "", image_url: "" });
  };

  resetErrors = () => {
    this.setState({ error: "", message: "" });
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
                input
                type="url"
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
        {this.state.error !== "" ? (
          <Message onDismiss={this.resetErrors} negative>
            {this.state.error}
          </Message>
        ) : null}
        {this.state.message !== "" ? (
          <Message onDismiss={this.resetErrors} positive>
            {this.state.message}
          </Message>
        ) : null}
      </Grid>
    );
  }
}

export default NewFolderForm;
