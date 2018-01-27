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
          value={this.props.tags}
          onChange={this.props.updateTags}
        />
      </form>
    );
  }
}

Search.propTypes = {
  tags: PropTypes.string,
  updateTags: PropTypes.func,
  searchPhotos: PropTypes.func
};

export default Search;
