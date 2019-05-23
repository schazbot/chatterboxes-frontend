import React, { useState } from "react";
import {
  Card,
  Button,
  Image,
  Form,
  Modal,
  Label,
  Icon
} from "semantic-ui-react";

const PictureCardModal = props => {
  const { picture } = props;

  const [modalOpen, setModalOpen] = useState(false);

  const handleEditSave = () => {
    props.editPicture();
    setModalOpen(false);
  };

  const handleDelete = () => {
    props.deletePicture();
    setModalOpen(false);
  };
  
  return (
    <Card key={picture.id} wrapped>
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
              setModalOpen(true);
            }}
            color={"blue"}
          >
            <Icon name="edit" />
            Edit
          </Button>
        }
      >
        <Modal.Header><Icon name="edit" />Edit Text</Modal.Header>
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
          </Form>
        </Modal.Content>
        <Modal.Content>
          <Button float right onClick={handleDelete} color={"red"}>
            Delete
          </Button>
          <Label pointing={"left"} size={"big"}>
            Delete picture from folder
          </Label>
        </Modal.Content>
      </Modal>
    </Card>
  );
};

export default PictureCardModal;
