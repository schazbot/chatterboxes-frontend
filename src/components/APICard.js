import React from "react";
import { Card, Image, Button } from "semantic-ui-react";

const PictureCard = ({ picture }) => {

  return (
    <Card
    >
      <Card.Content>
        <Image src={picture.image_url} />
        <Card.Description color={"black"}>
          {picture.name}
        </Card.Description>
        <Button positive onClick={() => props.handlePictureSelection(picture)}>
          Add to Folder
        </Button>
      </Card.Content>
    </Card>
  );
};

export default PictureCard;
