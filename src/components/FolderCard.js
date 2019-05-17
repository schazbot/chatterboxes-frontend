import React from "react";
import { Card, Image } from "semantic-ui-react";

const FolderCard = props => {
  const { folder } = props;

  return (
    <Card onClick={() => props.handleClick(folder)}>
      <Image src={folder.image} />
      <Card.Header>{folder.name.toLowerCase()}</Card.Header>
    </Card>
  );
};

export default FolderCard;
