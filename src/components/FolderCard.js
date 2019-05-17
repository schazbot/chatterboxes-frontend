import React from "react";
import { Card } from "semantic-ui-react";

const FolderCard = props => {
  const { folder } = props;

  return (
    <Card  
    onClick={() => props.handleClick(folder)}>

      <Card.Header color={"black"}>
        {props.folder.name.toLowerCase()}
      </Card.Header>
    </Card>
  );
};

export default FolderCard;