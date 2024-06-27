import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { fetchBudgetData } from './api'; 
import { Button } from 'antd';

const localizer = momentLocalizer(moment);

function CalendarComponent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBudgetData();
        const formattedEvents = data.map(item => ({
          title: `${item.type}: ${item.names} - ${item.price}`,
          start: new Date(item.date),
          end: new Date(item.date),
          allDay: true,
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{marginBottom:50}}>
      <h2 style={{textAlign:'center',marginBottom:'90'}}>Gelir ve Gider Takvimi</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{marginLeft:'auto',marginRight:'auto', height: 500 ,width:'80%'}}
        views={['month', 'week', 'day']} 
      />
      
    </div>
    
  );
}

export default CalendarComponent;
