import React from "react";
import { Card, Button, Image, Form, Modal, Label } from "semantic-ui-react";

const PictureCardModal = props => {
  const { picture } = props;

  return (
    <Card
      key={props.picture.id}
      onClick={() => props.handleClick(picture)}
      wrapped
      ui={false}
    >
      <Card.Content>
        <Image src={picture.url} />
        <Card.Description>{picture.text.toLowerCase()}</Card.Description>
      </Card.Content>

      <Modal size={"small"} trigger={<Button color={"blue"}>Edit</Button>}>
        <Modal.Header>Edit Text</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="medium" src={picture.url} />
          <Form>
            <Form.Field>
              <label>Type to change text</label>
              <input placeholder={picture.text} />
            </Form.Field>
            <Button color={"green"}>Save</Button>

            <Button color={"red"}>Delete</Button>
            <Label size={"big"}>
              Delete picture from folder
            </Label>
          </Form>
        </Modal.Content>
      </Modal>
    </Card>
  );
};

export default PictureCardModal;
