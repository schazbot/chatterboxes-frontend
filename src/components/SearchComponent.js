import React, { Component } from "react";
import { Icon, Grid } from "semantic-ui-react";

export default class SearchComponent extends Component {
  render() {
    return (
      <>
        <Grid>
        <Grid.Row >
          <input
            className="search-api-bar"
            type="text"
            placeholder="Search for..."
            onChange={this.props.handleSearchQuery}
          />
          <Icon color={"grey"} name="search" size="big" />
          </Grid.Row>
          </Grid>
      </>
    );
  }
}
