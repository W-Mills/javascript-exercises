function debounce(func, delay) {
  let timeout;

  return function() {
    const args = arguments;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function() {
      func.apply(null, args);
    }, delay);
  };
}