import React from "react";
import PictureCard from "../components/PictureCard";
import "font-awesome/css/font-awesome.min.css";
import "../App.css";
import { SayButton } from "react-say";
import { Grid, Segment, Button } from "semantic-ui-react";

class Sentence extends React.Component {
  render() {
    return (
      <>
        <Segment
          className="sentence-segment"
          color={"teal"}
          inverted
          size={"medium"}
        >
          <Grid fluid celled grid container columns={8}>
            <Grid.Row>
              <Grid.Column>
                <SayButton
                  className="speak-btn"
                  onClick={event => console.log(event)}
                  speak={this.props.mySentence.map(picture => picture.text)}
                >
                  <i className="fa fa-volume-up fa-7x" size="" />
                  Speak
                </SayButton>
              </Grid.Column>
              {this.props.mySentence.map(picture => (
                <Grid.Column>
                  <PictureCard
                    width={6}
                    wrapped
                    ui={false}
                    key={picture.id}
                    handleClick={this.props.handleClick}
                    picture={picture}
                  />
                </Grid.Column>
              ))}
              <Grid.Column right floated>
                <Button right floated onClick={this.props.clearSentence}>
                  Clear
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </>
    );
  }
}

export default Sentence;
