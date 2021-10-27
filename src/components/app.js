import React, { useEffect, useState } from 'react';

import Search from './search';
import Slideshow from './slideshow';

import { prevPhoto, nextPhoto } from '../logic/state-functions';

const flickrHost = 'https://api.flickr.com/services/rest/';
const flickrAPI = '7b07ad6356a53f942bd7453bdc60f7e0';
const flickrMethod = 'flickr.photos.search';
const flickrFormat = '&format=json&nojsoncallback=1';

export const flickrBuildAPIUrl = (tags) => {
  return `${flickrHost}?api_key=${flickrAPI}&method=${
    flickrMethod
  }&tags=${tags}${flickrFormat}`;
};

export const flickrPhotoUrl = (photo, format) => {
  const { farm: farmID, server: serverID, id, secret } = photo;
  if (farmID && serverID && id && secret) {
    return `https://farm${farmID}.staticflickr.com/${serverID}/${id}_${secret}_${format}.jpg`;
  } else {
    return '';
  }
};

const App = () => {
  const [appState, setAppState] = useState({
    selected: {},
    index: 0,
    photos: [],
    tags: 'puppy',
  });

  const handleSelectPhoto = (photo, index) => (
    setAppState({
      ...appState,
      selected: photo,
      index,
    })
  );

  const handlePrevPhoto = (e) => {
    e.preventDefault();
    setAppState({
      ...appState,
      ...prevPhoto(appState)
    });
  };

  const handleNextPhoto = (e) => {
    e.preventDefault();
    setAppState({
      ...appState,
      ...nextPhoto(appState)
    });
  };

  const handleUpdateTags = (e) => {
    const tags = e.target.value;
    setAppState({
      ...appState,
      tags
    });
  };

  const handleSearchPhotos = (e) => {
    e.preventDefault();
    if (appState.tags !== '') {
      fetch(flickrBuildAPIUrl(appState.tags.replace(/\s/g, '+')))
        .then(res => res.json())
        .then(response => {
          if (response.photos && response.photos.photo.length > 0) {
            setAppState({
              ...appState,
              selected: response.photos.photo[0],
              index: 0,
              photos: response.photos.photo,
            });
          }
        });
    }
  };

  useEffect(() => {
    fetch(flickrBuildAPIUrl(appState.tags))
      .then(res => res.json())
      .then(response => {
        setAppState({
          ...appState,
          selected: response.photos.photo[0],
          index: 0,
          photos: response.photos.photo,
        })
      });
  }, []);

  return (
    <div className="app">
      <Search
        tags={appState.tags}
        updateTags={handleUpdateTags}
        searchPhotos={handleSearchPhotos}
      />
      <Slideshow
        selected={appState.selected}
        photos={appState.photos}
        flickrPhotoUrl={flickrPhotoUrl}
        selectPhoto={handleSelectPhoto}
        prevPhoto={handlePrevPhoto}
        nextPhoto={handleNextPhoto}
      />
    </div>
  );
}

export default App;
