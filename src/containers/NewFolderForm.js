import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

const NEW_FOLDER_URL = "http://localhost:3002/api/v1/folders";

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
      .then(resp => {
        resp.json();
      })
      .then(this.resetFormState);
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
      <Form onSubmit={this.createNewFolder}>
        <label>New Folder</label>
        <input
          type="text"
          id="name"
          onChange={event => this.handleNameChange(event)}
          value={this.state.name}
          placeholder="Folder Name"
        />
        <input
          type="text"
          id="image_url"
          onChange={event => this.handleUrlChange(event)}
          placeholder="Add image url"
          value={this.state.image_url}
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default NewFolderForm;
