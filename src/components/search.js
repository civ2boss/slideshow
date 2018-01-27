import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  render() {
    return (
      <form className="search" onSubmit={this.props.searchPhotos}>
        <input
          type="search"
          name="search"
          className="search-box"
          placeholder="Search…"
          value={this.props.tag}
          onChange={this.props.updateTag}
        />
      </form>
    );
  }
}

Search.propTypes = {
  tag: PropTypes.string,
  updateTag: PropTypes.func,
  searchPhotos: PropTypes.func
};

export default Search;
