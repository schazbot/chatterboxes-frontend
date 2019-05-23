import React, { useState } from "react";
import { Card, Button, Image, Form, Modal, Label } from "semantic-ui-react";

const PictureCardModal = props => {
  const { picture } = props;

  const [modalOpen, setModalOpen] = useState(false)

  const handleEditSave = () => {
    props.editPicture()
    setModalOpen(false)
  }

  return (
    <Card key={picture.id} wrapped >
      <Card.Content>
        <Image src={picture.url} />
        <Card.Description>{picture.text}</Card.Description>
      </Card.Content>

      <Modal
        open={modalOpen}
        size={"small"}
        trigger={
          <Button
            onClick={() => {
              props.setPicture(picture);
              setModalOpen(true)
            }}
            color={"blue"}
          >
            Edit
          </Button>
        }
      >
        <Modal.Header>Edit Text</Modal.Header>
        <Modal.Content image>
          <Image wrapped size="medium" src={picture.url} />
          <Form>
            <Form.Field>
              <label>Type to change text</label>
              <input
                onChange={props.handlePictureFormChange}
                placeholder={picture.text}
              />
            </Form.Field>
            <Button onClick={handleEditSave} color={"green"}>
              Save
            </Button>

            <Button onClick={props.deletePicture} color={"red"}>Delete</Button>
            <Label size={"big"}>Delete picture from folder</Label>
          </Form>
        </Modal.Content>
      </Modal>
    </Card>
  );
};

export default PictureCardModal;
