import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';

import EventList from './EventList';
import EventForm from '../eventForm/EventForm';

import { sampleData } from '../../../app/api/sampleData';

export default function EventDashboard({
  formOpen,
  setFormOpen,
  selectEvent,
  selectedEvent,
}) {
  const [events, setEvents] = useState(sampleData);

  function handleCreateEvent(event) {
    setEvents([...events, event]);
  }

  function handleUpdateEvent(updatedEvent) {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    selectEvent(null);
  }

  function handleDeleteEvent(eventId) {
    setEvents(events.filter((event) => event.id !== eventId));
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          selectEvent={selectEvent}
          deleteEvent={handleDeleteEvent}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {formOpen && (
          <EventForm
            setFormOpen={setFormOpen}
            setEvents={setEvents}
            createEvent={handleCreateEvent}
            updateEvent={handleUpdateEvent}
            selectedEvent={selectedEvent}
            key={selectedEvent ? selectedEvent.id : null}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
