import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class MenuExampleBasic extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu icon="labeled">
        <Menu.Item
          name="home"
          as={Link}
          to="/"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        >
          <Icon name="talk" />
          Home
        </Menu.Item>

        {/* <Menu.Item
          name="create"
          as={Link}
          to="create"
          active={activeItem === "create"}
          onClick={this.handleItemClick}
        >
          <Icon name="folder" />
          Create Folder
        </Menu.Item> */}

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
      </Menu>
    );
  }
}
