import React from "react";
import { Card, Image } from "semantic-ui-react";

const FolderCard = props => {
  const { folder } = props;

  return (
    <Card color='black' onClick={() => props.handleClick(folder)} wrapped={"false"}>
      <Card.Content>
        <Image src={folder.image} />

        <Card.Description textAlign={"center"}>{folder.name}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default FolderCard;
