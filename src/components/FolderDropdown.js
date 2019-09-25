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
        image: { avatar: true, src: folder.image_url }
      };
    });
  };

  render() {
    const { parsedDropdownOptions } = this;
    const { handleFolderSelectionChange} = this.props
    return (
      <>
        <Grid>
          <Grid.Row>
            <Label pointing={"below"}>
              <Icon name="picture" size="big" /> Add pictures to folder
            </Label>
          </Grid.Row>
          <Grid.Row>
            <Dropdown
              placeholder="Select Folder"
              selection
              options={parsedDropdownOptions()}
              onChange={handleFolderSelectionChange}
            />
          </Grid.Row>


        </Grid>
      </>
    );
  }
}

export default FolderDropdown;
