import React from 'react';
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
  shallow(<App />);
});
