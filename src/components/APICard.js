import React from "react";
import { Card, Image } from "semantic-ui-react";

const PictureCard = props => {
  const { picture } = props;

  return (
    <Card>
      <Image src={picture.image_url} />
      <Card.Header color={"black"}>
        {picture.name.toLowerCase()}
      </Card.Header>
    </Card>
  );
};

export default PictureCard;
