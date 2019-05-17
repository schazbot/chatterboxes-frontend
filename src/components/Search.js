import React, { Component } from 'react';
class Search extends Component {
  
    style ={
        marginBottom: '8em'
        }


    render() {
        return (
            <div className="ui search ">
                <div className="ui icon input" style={this.style}>
                    <input className="prompt" type="text" value={this.props.searchTerm} onChange={ (e) => this.props.updateSearchTerm(e.target.value)} />
                  
                </div>
          </div>
        );
    }
}

export default Search;