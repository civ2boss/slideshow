import React from 'react';
import PropTypes from 'prop-types';

class Slideshow extends React.Component {
  render() {
    return (
      <div className="slideshow">
        <div className="viewer">
          <div className="image">
            <img
              src={this.props.flickrPhotoUrl(this.props.selected, 'c')}
              alt=""
            />
          </div>
          <div className="arrow arrow-left">
            <a href="" onClick={this.props.prevPhoto}>
              &lt;
            </a>
          </div>
          <div className="arrow arrow-right">
            <a href="" onClick={this.props.nextPhoto}>
              &gt;
            </a>
          </div>
        </div>
        <div className="thumbnails">
          <ul>
            {this.props.photos.map((photo, i) => (
              <li
                key={i}
                className={
                  Object.is(this.props.selected, photo) ? 'active' : ''
                }
                onClick={this.props.selectPhoto.bind(this, photo, i)}
              >
                <img src={this.props.flickrPhotoUrl(photo, 't')} alt="" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

Slideshow.propTypes = {
  selected: PropTypes.object,
  photos: PropTypes.array,
  flickrPhotoUrl: PropTypes.func,
  selectPhoto: PropTypes.func,
  prevPhoto: PropTypes.func,
  nextPhoto: PropTypes.func
};

export default Slideshow;
