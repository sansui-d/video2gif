import { SETPARAMETERS,SETGIFURL, SETGIFSTATE ,SETVIDEOURL,SETVIDEONAME} from '../types/index';


export function initGif(parameters) {
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

