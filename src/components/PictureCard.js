import React, { Component } from "react";
import { Card, Image } from "semantic-ui-react";

class PictureCard extends Component {
  render() {
    return (
      <div className="picture-card">
        <Card>
          <Image src={this.props.picture.url} />
          <Card.Header color={"black"}>
            {this.props.picture.text.toLowerCase()}
          </Card.Header>
        </Card>
      </div>
    );
  }
}

export default PictureCard;
