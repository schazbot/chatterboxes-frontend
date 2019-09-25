import React from "react";
import { Card, Image } from "semantic-ui-react";

const FolderCard = ({ folder, handleClick }) => {
  return (
    <Card className="folder-card" color='black' onClick={() => handleClick(folder)} >
      <Card.Content>
        <Image src={folder.image_url} />

        <Card.Description textAlign={"center"}>{folder.name}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default FolderCard;
