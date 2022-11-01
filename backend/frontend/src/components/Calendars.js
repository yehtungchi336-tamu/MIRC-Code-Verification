import React, {useContext, useEffect} from 'react'
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'

function Calendars() {


  useEffect(() => {
    let calendarEl = document.getElementById('calendar');
  
    let calendar = new Calendar(calendarEl, {
      plugins: [ dayGridPlugin, listPlugin ],
      height: 350,
      contentHeight: 300,
      events: [
        {
          title: 'Event 1',
          start: '2020-10-26'
        },
        {
          title: 'Event2',
          start: '2020-11-05'
        }
      ],
    });
    
    calendar.render();
     
  },[])

  return (
    <div className="calendar dashbox"> 
      <div id="calendar"></div>
    </div>
  )
}

export default Calendars