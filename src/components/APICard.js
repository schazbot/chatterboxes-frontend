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
      <Button onClick={props.handleOnSubmit} />
    </Card>
  );
};

export default PictureCard;
