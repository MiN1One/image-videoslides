# imgs2vid

### Available Scripts

Production application:
@localhost:8800
### `npm run start-server`

Development application:
@localhost:8801
1) Server
### `npm run start-server`
2) CRA
### `npm start`

### Config
Keyframe rate - 500ms
Image/Video quality - 80%
Image format - jpeg
Video format - mp4
Resolution - 640x480
Video duration - 15s

### What could be improved
Streams could be more performant than the method of first saving the images and videos and then serving the output video. 

And the process would look like:
1) Get the images from multer and save them in the memory storage temporarily
2) Pass the images to ffmpeg as a buffer
3) Pipe the response stream object

The reasons why the steps could/may not practically be applied:
1) If the user wants more images to be included in the video, the server memory will get overloaded
and that could be even more problematic when there are many users accessing the application
2) As of the experiments, ffmpeg does not accept input as buffer
3) There are size limits for images, images have to be commpressed
PS. Images can be compressed and formatted using ffmpeg. (later realised) 
4) There was no need to create stream, browser gets the video as a static file

## TIMING RESULTS can be found in the console