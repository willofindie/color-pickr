export default (event, bounds) => {
  return {
    x:
      event.clientX < bounds.left
        ? 0
        : event.clientX > bounds.left + bounds.width
        ? bounds.width
        : event.clientX - bounds.left,
    y:
      event.clientY < bounds.top
        ? 0
        : event.clientY > bounds.top + bounds.height
        ? bounds.height
        : event.clientY - bounds.top,
  };
};
