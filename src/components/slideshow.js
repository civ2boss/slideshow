import React from 'react';

class Slideshow extends React.Component {
  render() {
    return (
      <div className="slideshow">
        <div className="viewer">
          <div className="image" />
          <div className="arrow arrow-left">
            <a href="">&lt;</a>
          </div>
          <div className="arrow arrow-right">
            <a href="">&gt;</a>
          </div>
        </div>
        <div className="thumbnails" />
      </div>
    );
  }
}

export default Slideshow;
