import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    term: ''
  };

  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  }

  render() {
    return (
      <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text"><i className="fa fa-filter"></i></span>
        </div>
        <input type="text" className="form-control  search-input" placeholder="Filter" value={this.state.term} onChange={this.onSearchChange} />
      </div>
    );
  }
};


        // <input type="text"
        //   className="form-control search-input"
        //   placeholder="type to search" value={this.state.term} onChange={this.onSearchChange} />