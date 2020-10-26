import React from 'react';
import PropTypes from 'prop-types';

const Search = ({
  tags,
  updateTags,
  searchPhotos,
}) => (
  <form className="search" onSubmit={searchPhotos}>
    <input
      type="search"
      name="search"
      className="search-box"
      placeholder="Search…"
      value={tags}
      onChange={updateTags}
    />
  </form>
);

Search.propTypes = {
  tags: PropTypes.string,
  updateTags: PropTypes.func,
  searchPhotos: PropTypes.func
};

export default Search;
