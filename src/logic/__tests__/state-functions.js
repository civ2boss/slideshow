import { prevPhoto, nextPhoto } from '../state-functions';

test('prevPhoto shows the previous photo', () => {
  const startState = {
    selected: {
      farm: 5,
      id: '39215590324',
      isfamily: 0,
      isfriend: 0,
      ispublic: 1,
      owner: '70152224@N08',
      secret: 'fa0c4bd546',
      server: '4724',
      title: 'Liam. Day Fourty-Three.'
    },
    index: 1,
    photos: [
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
  };

  const finishState = prevPhoto(startState);

  expect(finishState.selected).toEqual(startState.photos[0]);
  expect(finishState.index).toBe(0);
});

test('prevPhoto shows last photo if at the beginning', () => {
  const startState = {
    selected: {
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
    index: 0,
    photos: [
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
  };

  const finishState = prevPhoto(startState);

  expect(finishState.selected).toEqual(startState.photos[1]);
  expect(finishState.index).toBe(1);
});

test('nextPhoto shows the next photo', () => {
  const startState = {
    selected: {
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
    index: 0,
    photos: [
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
  };

  const finishState = nextPhoto(startState);

  expect(finishState.selected).toEqual(startState.photos[1]);
  expect(finishState.index).toBe(1);
});

test('nextPhoto shows first photo if at the end', () => {
  const startState = {
    selected: {
      farm: 5,
      id: '39215590324',
      isfamily: 0,
      isfriend: 0,
      ispublic: 1,
      owner: '70152224@N08',
      secret: 'fa0c4bd546',
      server: '4724',
      title: 'Liam. Day Fourty-Three.'
    },
    index: 1,
    photos: [
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
  };

  const finishState = nextPhoto(startState);

  expect(finishState.selected).toEqual(startState.photos[0]);
  expect(finishState.index).toBe(0);
});
