import React from "react";
import { Card, Image } from "semantic-ui-react";

const PictureCard = ({ picture, handleClick }) => {

  return (
    <Card key={picture.id} onClick={() => handleClick(picture)}>
    <Card.Content>
      <Image src={picture.url} />
      
      <Card.Description>
        {props.picture.text}
      </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default PictureCard;
