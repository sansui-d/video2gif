import { SETGIFURL, SETLOADING } from '../types/index';

export function setGifUrl(gifUrl) {
    return {
      type: SETGIFURL,
      gifUrl
    }
  }

  export function setLoading(loading) {
    return {
      type: SETLOADING,
      loading
    }
  }

