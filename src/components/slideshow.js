import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Slideshow extends React.Component {
  componentDidUpdate() {
    const selectedThumb = ReactDOM.findDOMNode(this.refs.active);
    if (this.refs.scrollbox) {
      const scrollLeftAxis = this.refs.scrollbox.scrollLeft;
      const scrollRightAxis =
        this.refs.scrollbox.scrollLeft + this.refs.scrollbox.offsetWidth;
      if (
        selectedThumb.offsetLeft < scrollLeftAxis ||
        selectedThumb.offsetLeft > scrollRightAxis
      ) {
        this.refs.scrollbox.scrollLeft = selectedThumb.offsetLeft;
      }
    }
  }

  render() {
    return (
      <div className="slideshow">
        <div className="viewer">
          <div className="image">
            <img
              src={this.props.flickrPhotoUrl(this.props.selected, 'c')}
              alt=""
            />
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
        </div>
        <div className="thumbnails">
          <ul ref="scrollbox">
            {this.props.photos.map((photo, i) => (
              <li
                key={i}
                ref={Object.is(this.props.selected, photo) ? 'active' : ''}
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
