import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import App from '../App';

test('App renders without crashing', () => {
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
  const component = renderer.create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('flickrPhotoUrl returns a photo url', () => {
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
  const component = shallow(<App />);

  const photo = {
    farm: 5,
    id: '39215590324',
    isfamily: 0,
    isfriend: 0,
    ispublic: 1,
    owner: '70152224@N08',
    secret: 'fa0c4bd546',
    server: '4724',
    title: 'Liam. Day Fourty-Three.'
  };

  const url = component.instance().flickrPhotoUrl(photo, 't');
  expect(url).toBe(
    `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${
      photo.secret
    }_t.jpg`
  );
});
