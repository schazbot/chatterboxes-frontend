import React from "react";
import PictureCard from "../components/PictureCard";
import { SayButton } from "react-say";

class Sentence extends React.Component {

  render() {
    return (
      <div>
        <div>
            {this.props.allMyPictures.map(picture => <PictureCard  picture={picture}/>)}
          <SayButton
            onClick={event => console.log(event)}
            speak={this.props.allMyPictures.map(picture => picture.name)}
          >
            Speak
          </SayButton>

          
        </div>
      </div>
    );
  }
}

export default Sentence;
