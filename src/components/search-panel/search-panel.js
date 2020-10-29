import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  }

  render() {
    const {term,clearFilter} = this.props;

    let clearButton = '';

    if(term) {
      clearButton = <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={clearFilter}>
            <i className="fa fa-times" />
          </button>
        </div>;
    }

    return (
      <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text"><i className="fa fa-filter"></i></span>
        </div>
        <input type="text" className="form-control  search-input" placeholder="Filter" value={term} onChange={this.onSearchChange} />
        {clearButton}
      </div>
    );
  }
};


        // <input type="text"
        //   className="form-control search-input"
        //   placeholder="type to search" value={this.state.term} onChange={this.onSearchChange} />