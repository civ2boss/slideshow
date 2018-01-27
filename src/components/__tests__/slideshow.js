import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import Slideshow from '../Slideshow';
import App from '../App';

test('Slideshow renders without crashing', () => {
  global.fetch = jest.fn().mockImplementation(() => {
    return new Promise((res, rej) => {
      res({
        ok: true,
        Id: '123',
        json: function() {
          return {
            photos: {
              photo: [
                {
                  farm: 5,
                  id: '39027851635',
                  isfamily: 0,
                  isfriend: 0,
                  ispublic: 1,
                  owner: '70152224@N08',
                  secret: 'f8bd038f57',
                  server: '4757',
                  title: 'Liam. Day Fourty-Four.'
                },
                {
                  farm: 5,
                  id: '39215590324',
                  isfamily: 0,
                  isfriend: 0,
                  ispublic: 1,
                  owner: '70152224@N08',
                  secret: 'fa0c4bd546',
                  server: '4724',
                  title: 'Liam. Day Fourty-Three.'
                }
              ]
            }
          };
        }
      });
    });
  });
  const app = shallow(<App />).instance();

  const component = renderer.create(
    <Slideshow
      selected={app.state.selected}
      photos={app.state.photos}
      flickrPhotoUrl={app.flickrPhotoUrl}
      selectPhoto={app.selectPhoto}
      prevPhoto={app.prevPhoto}
      nextPhoto={app.nextPhoto}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
