import React, { Component } from "react";
import { Button, Form, Label, Icon, Grid, Message } from "semantic-ui-react";
import Api from "../Api";

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
    Api.post(NEW_FOLDER_URL, {
        user_id: 1,
        name: this.state.name,
        image_url: this.state.image_url
      }).then(newFolder => {
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

    const { name, image_url, error, message} = this.state
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
                value={name}
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
                value={image_url}
              />
              <Label pointing="left">Image Url</Label>
            </Form.Field>
            <Button positive type="submit">
              Submit
            </Button>
          </Form>
        </Grid.Row>
        {error !== "" ? (
          <Message onDismiss={this.resetErrors} negative>
            {error}
          </Message>
        ) : null}
        {message !== "" ? (
          <Message onDismiss={this.resetErrors} positive>
            {message}
          </Message>
        ) : null}
      </Grid>
    );
  }
}

export default NewFolderForm;
