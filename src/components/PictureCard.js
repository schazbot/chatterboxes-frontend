import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";

const PictureCard = props => {
  const { picture } = props;

  return (
    <Card key={props.picture.id} onClick={() => props.handleClick(picture)}>
      <Image src={props.picture.url} />
      <Card.Header color={"black"}>
        {props.picture.text.toLowerCase()}
      </Card.Header>
    </Card>
  );
};

export default PictureCard;
