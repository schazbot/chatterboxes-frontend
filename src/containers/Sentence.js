import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "../App.css";
import { SayButton } from "react-say";
import { Segment } from "semantic-ui-react";

class Sentence extends React.Component {
  render() {
    return (
      <Segment color={"teal"} inverted size={"massive"}>
        <SayButton
          className="speak-btn"
          onClick={event => console.log(event)}
          speak={"hi"}
        >
          <i className="fa fa-volume-up fa-7x" size="" />
          Speak
        </SayButton>
      </Segment>
    );
  }
}

export default Sentence;
