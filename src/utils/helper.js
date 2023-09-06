const fileTypes = [
  'video/mp4',
  'video/avi',
  'video/wmv',
  'video/mov',
  'video/flv',
  'video/mkv',
]

export function isVideo(file) {
  return fileTypes.includes(file.type);
}

export function debounce(func, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}