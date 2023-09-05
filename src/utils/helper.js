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