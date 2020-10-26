import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Slideshow = ({
  selected,
  photos,
  flickrPhotoUrl,
  selectPhoto,
  prevPhoto,
  nextPhoto
}) => {
  const active = useRef(null);
  const scrollbox = useRef(null);

  useEffect(() => {
    const selectedThumb = ReactDOM.findDOMNode(active.current);
    if (scrollbox.current && selectedThumb) {
      const scrollLeftAxis = scrollbox.current.scrollLeft;
      const scrollRightAxis =
        scrollbox.current.scrollLeft + scrollbox.current.offsetWidth;
      if (
        selectedThumb.offsetLeft < scrollLeftAxis ||
        selectedThumb.offsetLeft > scrollRightAxis
      ) {
        scrollbox.current.scrollLeft = selectedThumb.offsetLeft;
      }
    }
  });

  return (
    <div className="slideshow">
      <div className="viewer">
        <div className="image">
          <img
            src={flickrPhotoUrl(selected, 'c')}
            alt=""
          />
          <div className="arrow arrow-left">
            <button onClick={prevPhoto}>
              &lt;
            </button>
          </div>
          <div className="arrow arrow-right">
            <button onClick={nextPhoto}>
              &gt;
            </button>
          </div>
        </div>
      </div>
      <div className="thumbnails">
        <ul ref={scrollbox}>
          {photos.map((photo, i) => (
            <li
              key={i}
              ref={Object.is(selected, photo) ? active : undefined}
              className={
                Object.is(selected, photo) ? 'active' : ''
              }
              onClick={selectPhoto.bind(this, photo, i)}
            >
              <img src={flickrPhotoUrl(photo, 't')} alt="" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
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
