import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

class FolderDropdown extends Component {
  state = {
   
  };

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
        <Dropdown
          placeholder="Select Folder"
          selection
          text="Choose a folder"
          options={parsedDropdownOptions()}
          onChange={this.props.handleSelectionChange}
        />

      </>
    );
  }
}

export default FolderDropdown;
