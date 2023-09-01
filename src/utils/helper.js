import GIF from 'gif.js';
import gifWorker from './gif-worker'

export const video2gif = (imageElement) => {
    var gif = new GIF({
        workers: 2,
        quality: 10,
        width: 200,
        height: 200,
        workerScript: gifWorker,
      });
      
      // add an image element
      gif.addFrame(imageElement);
      
      // or a canvas element
    //   gif.addFrame(canvasElement, {delay: 200});
      
      // or copy the pixels from a canvas context
    //   gif.addFrame(ctx, {copy: true});
      
      gif.on('finished', function(blob) {
        // window.open(URL.createObjectURL(blob));
        console.log(blob)
      });
      
      gif.render();
}