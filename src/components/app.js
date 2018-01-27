import React from 'react';

import Search from './search.js';
import Slideshow from './slideshow.js';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      selected: {},
      selectedIndex: 0,
      photos: [],
      tag: 'puppy'
    };

    this.selectPhoto = this.selectPhoto.bind(this);
    this.prevPhoto = this.prevPhoto.bind(this);
    this.nextPhoto = this.nextPhoto.bind(this);
  }

  flickrPhotoUrl(photo, format) {
    const farmID = photo.farm;
    const serverID = photo.server;
    const id = photo.id;
    const secret = photo.secret;
    return `https://farm${farmID}.staticflickr.com/${serverID}/${id}_${secret}_${format}.jpg`;
  }

  selectPhoto(photo, index) {
    this.setState({
      selected: photo,
      selectedIndex: index
    });
  }

  prevPhoto(e) {
    e.preventDefault();
    const newIndex =
      this.state.selectedIndex === 0
        ? this.state.photos.length - 1
        : this.state.selectedIndex - 1;
    this.setState({
      selected: this.state.photos[newIndex],
      selectedIndex: newIndex
    });
  }

  nextPhoto(e) {
    e.preventDefault();
    const newIndex =
      this.state.selectedIndex === this.state.photos.length - 1
        ? 0
        : this.state.selectedIndex + 1;
    this.setState({
      selected: this.state.photos[newIndex],
      selectedIndex: newIndex
    });
  }

  componentDidMount() {
    fetch(
      `https://api.flickr.com/services/rest/?api_key=7b07ad6356a53f942bd7453bdc60f7e0&method=flickr.photos.search&tags=puppy&format=json&nojsoncallback=1`
    )
      .then(res => res.json())
      .then(response => {
        this.setState({
          selected: response.photos.photo[0],
          selectedIndex: 0,
          photos: response.photos.photo
        });
      });
  }

  render() {
    return (
      <div className="app">
        <Search />
        <Slideshow
          selected={this.state.selected}
          photos={this.state.photos}
          flickrPhotoUrl={this.flickrPhotoUrl}
          selectPhoto={this.selectPhoto}
          prevPhoto={this.prevPhoto}
          nextPhoto={this.nextPhoto}
        />
      </div>
    );
  }
}

export default App;
