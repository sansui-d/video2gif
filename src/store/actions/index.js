import { SETPARAMETERS, SETPROGRESS, SETGIFURL, SETGIFSTATE, SETVIDEOURL, SETVIDEONAME } from '../types/index';

export function setParameters(parameters) {
  return {
    type: SETPARAMETERS,
    parameters
  }
}
export function setGifUrl(gifUrl) {
  return {
    type: SETGIFURL,
    gifUrl
  }
}
export function setGifState(gifState) {
  return {
    type: SETGIFSTATE,
    gifState
  }
}
export function setVideoUrl(videoUrl) {
  return {
    type: SETVIDEOURL,
    videoUrl
  }
}
export function setVideoName(videoName) {
  return {
    type: SETVIDEONAME,
    videoName
  }
}

export function setProgress(progress) {
  return {
    type: SETPROGRESS,
    progress
  }
}
