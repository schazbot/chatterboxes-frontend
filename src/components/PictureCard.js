import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";


class PictureCard extends Component {
  render() {
    return (
      <div>
        <Card>
          <Image
            src={this.props.picture.image_url}
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>{this.props.picture.name.toLowerCase()}</Card.Header>
          </Card.Content>
        </Card>
     
      </div>
    );
  }
}

export default PictureCard;
