import React, {Component} from "react";
import { Button, Form } from "semantic-ui-react";
class NewFolderForm extends Component {
  state = {};

  render() {
    return (
      <Form>
        <Form.Field>
          <label>Folder Name</label>
          <input placeholder="Folder Name" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default NewFolderForm;
