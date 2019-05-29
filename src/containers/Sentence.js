import React from "react";

import PictureCard from "../components/PictureCard";

import "font-awesome/css/font-awesome.min.css";
import { SayButton } from "react-say";
import { Grid, Segment, Button } from "semantic-ui-react";

class Sentence extends React.Component {
  render() {
    return (
      <>
        <Segment.Group horizontal className="long-segment">
          <Segment color="red">
            <SayButton
              className="speak-button" id="speak-button"
              onClick={event => console.log(event)}
              voice={voices => [].find.call(voices, v => v.lang === "en")}
              speak={this.props.mySentence.map(picture => picture.text)}
            >
              <i className="fa fa-volume-up fa-10x" />
              Speak
            </SayButton>
          </Segment>

          <Segment color="yellow">
            <Grid className="sentence-row" container columns={6}>
              <Grid.Row>
                {this.props.mySentence.map(picture => (
                  <Grid.Column>
                    <PictureCard                    
                      key={picture.id}
                      handleClick={this.props.handleClick}
                      picture={picture}
                    />
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          </Segment>

          <Segment color="blue">
            <Button size={"mini"}onClick={this.props.clearSentence}>Clear</Button>
          </Segment>
        </Segment.Group>
      </>
    );
  }
}

export default Sentence;
