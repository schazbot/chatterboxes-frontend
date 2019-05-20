import React from "react";
import { Card, Button, Image, Form, Modal } from "semantic-ui-react";

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
        <Image src={props.picture.url} />
        <Card.Description>{props.picture.text.toLowerCase()}</Card.Description>
      </Card.Content>

      <Modal size={"small"} trigger={<Button color={"blue"}>Edit</Button>}>
        <Modal.Header>Edit Text</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="medium" src={picture.url} />
          <Form>
            <Form.Field>
              <label>Edit text</label>
              <input placeholder={picture.text} />
            </Form.Field>
            <Button color={"green"}>Save</Button>
          </Form>
        </Modal.Content>
      </Modal>
      <Button color={"red"}>Delete</Button>
    </Card>
  );
};

export default PictureCardModal;
