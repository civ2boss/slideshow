export function prevPhoto(state) {
  const newIndex =
    state.index === 0
      ? state.photos.length - 1
      : state.index - 1;
  return {
    selected: state.photos[newIndex],
    index: newIndex
  };
}

export function nextPhoto(state) {
  const newIndex =
    state.index === state.photos.length - 1
      ? 0
      : state.index + 1;
  return {
    selected: state.photos[newIndex],
    index: newIndex
  };
}
