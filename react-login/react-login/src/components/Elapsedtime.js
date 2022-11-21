import React, {useState, useEffect} from 'react'

function ElapsedTime(props) {
 
  const [elapsedTime, setElapsedTime] = useState('')
  const [regdate, setRegDate] = useState('')
  const [providedtime, setProvidedTime] = useState(props.providedtime)

  function msToTime(duration) {
    let date = new Date()
    let minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    let pday = providedtime.getDate()
    let pmonth = providedtime.getMonth()
    let pyear = providedtime.getFullYear()
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear() 
    if(pday===day && pmonth===month && pyear===year && hours < 24) {
      if(hours < 1) {
        if(minutes < 1)
          return "A few seconds ago"
        else if (minutes === 1)
          return "A minute ago"
        else 
          return minutes+" minutes ago"
      }
      else if(hours === 1) 
        return "One hour ago"
      else 
        return hours+" hours ago"
    }
    else {
      return providedtime.toString().split(' ').slice(1,4).toString().replaceAll(',',' ') 
    }
  } 

  useEffect(() => {
    var storedDate = new Date(providedtime)
    var nowDate = new Date()
    var elapsedTime = nowDate.getTime() - storedDate.getTime()
    setElapsedTime(msToTime(elapsedTime))
  },[props.updateelapsed, providedtime])

  return <>{elapsedTime}</> 
}

export default ElapsedTime