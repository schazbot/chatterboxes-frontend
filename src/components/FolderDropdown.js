import React, { Component } from "react";
import { Dropdown, Search } from "semantic-ui-react";

class FolderDropdown extends Component {
  state = {
    folder_id: ""
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

 

  handleSelectionChange = (e, { value }) => {
    this.setState({folder_id: value });
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
          onChange={this.handleSelectionChange}
        />

      </>
    );
  }
}

export default FolderDropdown;
