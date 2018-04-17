import React from 'react';

import Search from './search';
import Slideshow from './slideshow';

import { prevPhoto, nextPhoto } from '../logic/state-functions';

class App extends React.Component {
  flickrHost = 'https://api.flickr.com/services/rest/';
  flickrAPI = '7b07ad6356a53f942bd7453bdc60f7e0';
  flickrMethod = 'flickr.photos.search';
  flickrFormat = '&format=json&nojsoncallback=1';

  state = {
    selected: {},
    selectedIndex: 0,
    photos: [],
    tags: 'puppy'
  }

  flickrBuildAPIUrl(tags) {
    return `${this.flickrHost}?api_key=${this.flickrAPI}&method=${
      this.flickrMethod
    }&tags=${tags}${this.flickrFormat}`;
  }

  flickrPhotoUrl(photo, format) {
    const { farm: farmID, server: serverID, id, secret } = photo;
    if (farmID && serverID && id && secret) {
      return `https://farm${farmID}.staticflickr.com/${serverID}/${id}_${secret}_${format}.jpg`;
    } else {
      return '';
    }
  }

  selectPhoto = (photo, index) => {
    this.setState({
      selected: photo,
      selectedIndex: index
    });
  }

  prevPhoto = (e) => {
    e.preventDefault();
    this.setState(prevPhoto(this.state));
  }

  nextPhoto = (e) => {
    e.preventDefault();
    this.setState(nextPhoto(this.state));
  }

  updateTags = (e) => {
    let tags = e.target.value;
    this.setState({
      tags
    });
  }

  searchPhotos = (e) => {
    e.preventDefault();
    if (this.state.tags !== '') {
      fetch(this.flickrBuildAPIUrl(this.state.tags.replace(/\s/g, '+')))
        .then(res => res.json())
        .then(response => {
          if (response.photos && response.photos.photo.length > 0) {
            this.setState({
              selected: response.photos.photo[0],
              selectedIndex: 0,
              photos: response.photos.photo
            });
          }
        });
    }
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
