import React, { useEffect, useState } from "react";


//Fullcalendar and Realted Plugins
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import './Deadline.css'





function Deadline() {
  // Array to store month string values
  

  // State for date selected by user
  const [selectedDate, setSelectedDate] = useState([]);
  const [user] = useAuthState(auth);

  // State for text above calander
  
  useEffect(() => {
    if (user) {
        fetch(`http://localhost:5000/task/${user?.email}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log('user task', data);
                setSelectedDate(data);
            })
    }
}, [user]);



 

  return (
    <div className="maincontainer w-full 
    ">
      
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        
        className="deadline h-10/12 w-10/12  "
        events={
          selectedDate.map(event =>(
          {title:event.title,  date: event.deadline}
          ))
        }
      />
      
</div>
  );
}

export default Deadline;