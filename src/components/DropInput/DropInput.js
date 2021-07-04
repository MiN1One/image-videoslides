import { memo, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoCloseOutline } from 'react-icons/io5';

import Loader from '../../components/UI/Loader';
import useHttp from '../../hooks/useHttp';
import './DropInput.scss';

const DropInput = () => {
  const { loading, data, createRequest, setData } = useHttp();
  const videoRef = useRef();
  const [play, setPlay] = useState(false);

  const handleImageUpload = (files) => {
    const form = new FormData();
    Array.from(files).forEach(e => form.append('frame', e));

    createRequest({
      url: '/api/images',
      body: form,
      method: 'post',
      callback: () => setPlay(false)
    });
  };

  useEffect(() => {
    if (data) {
      if (play) { 
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [play, data]);

  const {
    getRootProps,
    getInputProps, 
    isDragActive
  } = useDropzone({ onDrop: handleImageUpload });

  const classDrop = ['dropinput'];
  if (data) {
    classDrop.push('dropinput--active');
  }

  let view = (
    <>
      <input {...getInputProps()} accept="image/*" multiple />
      {isDragActive
        ? 'Drop images here'
        : 'Drop the images'
      }
    </>
  );

  if (data) {
    view = (
      <>
        <button className="dropinput__btn" onClick={() => setData(null)}>
          <IoCloseOutline className="dropinput__icon" />
        </button>
        {!play && (
          <button 
            className="dropinput__btn-main" 
            onClick={() => setPlay(videoRef.current.paused)} />
        )}
        <video 
          className="dropinput__video"
          name="media"
          controls
          ref={videoRef} 
          onClick={() => setPlay(videoRef.current.paused)}
        >
          <source src={`/video/${data.timestamp}/video.mp4`} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      </>
    )
  }

  else if (loading) {
    view = <Loader />;
  }

  return (
    <div className={classDrop.join(' ')} {...getRootProps()}>
      {view}
    </div>
  );
}

export default memo(DropInput);
