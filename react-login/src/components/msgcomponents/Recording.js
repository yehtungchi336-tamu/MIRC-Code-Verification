import React, {useState, useEffect, useRef} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 

function Recording (props) {
  const {src}= props
  const video =useRef()  
  const playBtn = useRef()
  const progress = useRef()
  const playPause = useState(false)
  function togglePlayPause(e){
    if(video.current.paused){
      video.current.play()
      e.target.className='fal fa-pause'
    }
    else {
      video.current.pause()
      e.target.className='fal fa-play'
    }
  }
function updateProgress(){
    const progresswidth = video.current.currentTime/video.current.duration
    setTime((video.current.duration-video.current.currentTime).toFixed(1))
    progress.current.style.width=progresswidth*100+'%'
    if(video.current.ended){
      playBtn.current.className='fal fa-play'
    }
    }
    const [time, setTime]=useState('')
    function determineMinSecH(time){
      if(time>60){
        return (time / 60).toFixed(0) +' m'
      }else if (time>3600){
        return (time/3600).toFixed(1) + ' h'
      }else {
        return Math.round(time) + ' s'
      }
    }
  return (
    <div className='videoContainer'> 
      <video onLoadedData={()=>setTime(video.current.duration.toFixed(1))} onTimeUpdate={()=>updateProgress()} src={src} id='video' ref={video}></video>
        <div className="controls">
          <i className="fal fa-play" ref={playBtn} onClick={(e)=>togglePlayPause(e)}></i>
          <div className="progressvideo">
            <div className="progress" ref={progress}></div>
          </div>
          <small>{determineMinSecH(time)}</small>
        </div>
    </div>
   
  )
}
export default Recording