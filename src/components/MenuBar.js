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
          name="folders"
          as={Link}
          to="/"
          active={activeItem === "folders"}
          onClick={this.handleItemClick}
        >
          <Icon name="folder" />
          Folders
        </Menu.Item>

        <Menu.Item
          name="create"
          as={Link}
          to="create"
          active={activeItem === "create"}
          onClick={this.handleItemClick}
        >
          <Icon name="plus" />
          Create
        </Menu.Item>

        <Menu.Item
          name="search"
          as={Link}
          to="/search"
          active={activeItem === "search"}
          onClick={this.handleItemClick}
        >
          <Icon name="search" />
          Search
        </Menu.Item>
      </Menu>
    );
  }
}
