export function prevPhoto(state) {
  const newIndex =
    state.selectedIndex === 0
      ? state.photos.length - 1
      : state.selectedIndex - 1;
  return {
    selected: state.photos[newIndex],
    selectedIndex: newIndex
  };
}

export function nextPhoto(state) {
  const newIndex =
    state.selectedIndex === state.photos.length - 1
      ? 0
      : state.selectedIndex + 1;
  return {
    selected: state.photos[newIndex],
    selectedIndex: newIndex
  };
}
