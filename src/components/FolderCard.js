import React from "react";
import { Card, Image } from "semantic-ui-react";

const FolderCard = props => {
  const { folder } = props;

  return (
    <Card onClick={() => props.handleClick(folder)} wrapped ui={false}>
      <Card.Content>
        <Image src={folder.image} />

        <Card.Description>{folder.name.toLowerCase()}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default FolderCard;
