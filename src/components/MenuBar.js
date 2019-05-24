import React, { Component } from "react";
import { Menu, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import logo from "../logo.png";

export default class MenuExampleBasic extends Component {
  state = {};

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.resetSelectedFolder();
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu icon="labeled">
        <Menu.Item
          name="folders"
          as={Link}
          to="/folders"
          active={activeItem === "folders"}
          onClick={this.handleItemClick}
        >
          <Icon name="folder" />
          My Folders
        </Menu.Item>

        <Menu.Item
          name="add"
          as={Link}
          to="/add"
          active={activeItem === "add"}
          onClick={this.handleItemClick}
        >
          <Icon name="plus square outline" />
          Create and Add
        </Menu.Item>
        <Menu.Item
          name="edit"
          as={Link}
          to="edit"
          active={activeItem === "edit"}
          onClick={this.handleItemClick}
        >
          <Icon name="edit outline" />
          Edit
        </Menu.Item>
        <Menu.Item position="right">
          <Image className="logo-navbar" size="tiny" src={logo} />
        </Menu.Item>
      </Menu>
    );
  }
}
