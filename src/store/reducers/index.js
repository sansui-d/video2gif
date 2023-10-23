import { SETPARAMETERS, SETPROGRESS, SETGIFURL, SETGIFSTATE, SETVIDEOURL, SETVIDEONAME } from '../types/index'

const rootState = {
  parameters: { width: 640, height: 340, quality: 10, delay: 100 },
  gifUrl: '',
  gifState: 0, // 0:未开始 1:录制中 2:制作中 3:已完成
  videoUrl: '',
  videoName: 'video2gif',
  progress: 0,
}
export default function reducers(state = rootState, actions) {
  switch (actions.type) {
    case SETPARAMETERS: {
      const parameters = actions.parameters
      return { ...state, parameters: { ...parameters } }
    }
    case SETGIFURL:
      return { ...state, gifUrl: actions.gifUrl }
    case SETGIFSTATE:
      return { ...state, gifState: actions.gifState }
    case SETVIDEOURL:
      return { ...state, videoUrl: actions.videoUrl }
    case SETVIDEONAME:
      return { ...state, videoName: actions.videoName }
    case SETPROGRESS:
      return { ...state, progress: actions.progress }
    default:
      return state
  }
}