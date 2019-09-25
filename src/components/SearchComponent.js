import React, { Component } from "react";
import { Icon, Grid } from "semantic-ui-react";

export default class SearchComponent extends Component {
  render() {
    const { handleSearchQuery} = this.props
    return (
      <>
        <Grid>
        <Grid.Row >
          <input
            className="search-api-bar"
            type="text"
            placeholder="Search for..."
            onChange={handleSearchQuery}
          />
          <Icon color={"grey"} name="search" size="big" />
          </Grid.Row>
          </Grid>
      </>
    );
  }
}
