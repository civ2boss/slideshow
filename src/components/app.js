import React from 'react';

import Search from './search';
import Slideshow from './slideshow';

import { prevPhoto, nextPhoto } from '../logic/state-functions';

class App extends React.Component {
  constructor() {
    super();

    this.flickrHost = `https://api.flickr.com/services/rest/`;
    this.flickrAPI = '7b07ad6356a53f942bd7453bdc60f7e0';
    this.flickrMethod = 'flickr.photos.search';
    this.flickrFormat = '&format=json&nojsoncallback=1';

    this.state = {
      selected: {},
      selectedIndex: 0,
      photos: [],
      tags: 'puppy'
    };

    this.selectPhoto = this.selectPhoto.bind(this);
    this.prevPhoto = this.prevPhoto.bind(this);
    this.nextPhoto = this.nextPhoto.bind(this);
    this.updateTags = this.updateTags.bind(this);
    this.searchPhotos = this.searchPhotos.bind(this);
  }

  flickrBuildAPIUrl(tags) {
    return `${this.flickrHost}?api_key=${this.flickrAPI}&method=${
      this.flickrMethod
    }&tags=${tags}${this.flickrFormat}`;
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
    this.setState(prevPhoto(this.state));
  }

  nextPhoto(e) {
    e.preventDefault();
    this.setState(nextPhoto(this.state));
  }

  updateTags(e) {
    let tags = e.target.value;
    this.setState({
      tags
    });
  }

  searchPhotos(e) {
    e.preventDefault();
    fetch(this.flickrBuildAPIUrl(this.state.tags.replace(/\s/g, '+')))
      .then(res => res.json())
      .then(response => {
        this.setState({
          selected: response.photos.photo[0],
          selectedIndex: 0,
          photos: response.photos.photo
        });
      });
  }

  componentDidMount() {
    fetch(this.flickrBuildAPIUrl(this.state.tags))
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
        <Search
          tags={this.state.tags}
          updateTags={this.updateTags}
          searchPhotos={this.searchPhotos}
        />
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
