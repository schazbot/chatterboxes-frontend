import React, { Component } from "react";
import { Dropdown, Grid, Icon, Label } from "semantic-ui-react";

class FolderDropdown extends Component {
  parsedDropdownOptions = () => {
    return this.props.allMyFolders.map(folder => {
      return {
        key: folder.name,
        id: folder.id,
        text: folder.name,
        value: folder.id,
        image: folder.image
      };
    });
  };


  render() {
    const { parsedDropdownOptions } = this;
    return (
      <>
        <Grid.Row relaxed="true">
          <Label color="teal">
            <Icon name="picture" size="big" /> Add pictures to folder
          </Label>
        </Grid.Row>
        <Grid.Row>
          <Dropdown
            placeholder="Select Folder"
            selection
            text="Choose a folder"
            options={parsedDropdownOptions()}
            
            onChange={this.props.handleFolderSelectionChange}
          />
       
        </Grid.Row>
      </>
    );
  }
}

export default FolderDropdown;
