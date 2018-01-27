import React from 'react';

import Search from './search.js';
import Slideshow from './slideshow.js';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Search />
        <Slideshow />
      </div>
    );
  }
}

export default App;
