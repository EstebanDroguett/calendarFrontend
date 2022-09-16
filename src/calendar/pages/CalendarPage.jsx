//------------------------------------------------------------------------3------------------------------------------------------------------------
import { useState } from 'react';
import { Navbar, CalendarEvent, CalendarModal, FabAddNew,FabDelete } from '../';

//colocar en cmd: npm add date-fns
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { localizer, getMessagesES } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';

export const CalendarPage = () => {

  //------------------------------------------------------------------------8------------------------------------------------------------------------
  const { openDateModal } = useUiStore();
  //------------------------------------------------------------------------8------------------------------------------------------------------------
  //------------------------------------------------------------------------9------------------------------------------------------------------------
  const { events, setActiveEvent } = useCalendarStore();
  //------------------------------------------------------------------------9------------------------------------------------------------------------

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'Week'); //Sirve para recordar la página que se eligió.

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    //console.log({ doubleClick: event })
    console.log('abriendo modal')
    //------------------------------------------------------------------------8------------------------------------------------------------------------
    openDateModal();
    //------------------------------------------------------------------------8------------------------------------------------------------------------
  }

  const onSelect = (event) => {
    //------------------------------------------------------------------------10------------------------------------------------------------------------
    setActiveEvent(event);
    //------------------------------------------------------------------------10------------------------------------------------------------------------
    //console.log({ click: event })
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event); //Sirve para recordar la página que se eligió.
    setLastView(event)
  }

  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      {/*------------------------------------------------------------------------11------------------------------------------------------------------------*/}
      <FabAddNew />
      {/*------------------------------------------------------------------------11------------------------------------------------------------------------*/}
      {/*------------------------------------------------------------------------14------------------------------------------------------------------------*/}
      <FabDelete />
      {/*------------------------------------------------------------------------14------------------------------------------------------------------------*/}
    </>
  )
}
//------------------------------------------------------------------------3------------------------------------------------------------------------