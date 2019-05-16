import React from "react";
import PictureCard from "../components/PictureCard";
import "font-awesome/css/font-awesome.min.css";
import "../App.css";
import { SayButton } from "react-say";
import { Grid } from "semantic-ui-react";

import { Segment } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

class Sentence extends React.Component {
  render() {
    return (
      <>
        <Segment color={"teal"} inverted size={"massive"}>
        <Grid  container columns={5}>
        <Grid.Row>
        <SayButton
          className="speak-btn"
          onClick={event => console.log(event)}
          speak={this.props.mySentence.map(picture => picture.text)}
        >
          <i className="fa fa-volume-up fa-7x" size="" />
          Speak
        </SayButton>
          {this.props.mySentence.map(picture => (
            <PictureCard key={picture.id}
              handleClick={this.props.handleClick}
              picture={picture}
            />
          ))}
          <Button onClick={this.props.clearSentence}>Clear</Button>
          </Grid.Row>
        </Grid>
        </Segment>
      </>
    );
  }
}

export default Sentence;
