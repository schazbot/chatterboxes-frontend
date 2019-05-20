import React from "react";
import { Card, Image, Button } from "semantic-ui-react";

const PictureCard = props => {
  const { picture } = props;

  return (
    <Card
      onSubmit={props.handleOnSubmit}
      onClick={() => props.handlePictureSelection(picture)}
    >
      <Card.Content>
        <Image src={picture.image_url} />
        <Card.Description color={"black"}>
          {picture.name.toLowerCase()}
        </Card.Description>
        <Button positive onClick={props.handleOnSubmit}>
          Add to Folder
        </Button>
      </Card.Content>
    </Card>
  );
};

export default PictureCard;
