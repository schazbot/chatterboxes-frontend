import React from "react";
import { Card, Image } from "semantic-ui-react";

const PictureCard = props => {
  const { picture } = props;

  return (
    <Card key={props.picture.id} onClick={() => props.handleClick(picture)}wrapped={"false"}>
    <Card.Content>
      <Image src={props.picture.url} />
      <Card.Description>
        {props.picture.text}
      </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default PictureCard;
