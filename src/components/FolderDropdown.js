import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

class FolderDropdown extends Component {
  parsedDropdownOptions = () => {
    return this.props.allMyFolders.map(folder => {
      return {
        key: folder.name,
        text: folder.name,
        value: folder.name,
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
        />
      </>
    );
  }
}

export default FolderDropdown;
