import React from "react";
import { Card, Image, Button } from "semantic-ui-react";

const PictureCard = props => {
  const { picture } = props;

  return (
    <Card 
      onSubmit={props.handleOnSubmit}
      onClick={() => props.handlePictureSelection(picture)}
    >
      <Image src={picture.image_url} />
      <Card.Header color={"black"}>{picture.name.toLowerCase()}</Card.Header>
      <Button positive onClick={props.handleOnSubmit}>
        Add to Folder
      </Button>
    </Card>
  );
};

export default PictureCard;
