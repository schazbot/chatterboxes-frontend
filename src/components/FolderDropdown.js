import React, { Component } from "react";
import { Dropdown, Grid, Icon, Label } from "semantic-ui-react";
// import FolderCard from "../components/FolderCard";


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

  // findFolder = () => {
  //   return this.props.allMyFolders.filter(
  //     folder => folder.id === this.props.folder_id
  //   );
  // };

  render() {
    const { parsedDropdownOptions } = this;
    return (
      <>
        <Grid.Row relaxed>
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
          {/* {this.props.folderId ? (
          this.findFolder()
          ) : null} */}
        </Grid.Row>
      </>
    );
  }
}

export default FolderDropdown;
