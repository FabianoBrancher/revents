import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cuid from 'cuid';

import { Link } from 'react-router-dom';
import { Segment, Header, Button } from 'semantic-ui-react';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';

import { createEvent, updateEvent } from '../eventActions';
import MySelectInput from '../../../app/common/form/MySelectInput';

import { categoryData } from '../../../app/api/categoryData';

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required(),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: 'Bob',
                  attendees: [],
                  hostPhotoURL: '/assets/user.png',
                })
              );
          history.push('/events');
        }}
        validationSchema={validationSchema}
      >
        <Form className="ui form">
          <Header sub color="teal" content="Event Details" />
          <MyTextInput name="title" placeholder="Event title" />
          <MySelectInput
            name="category"
            placeholder="Event category"
            options={categoryData}
          />
          <MyTextArea name="description" placeholder="Description" rows={3} />
          <Header sub color="teal" content="Event Locations Details" />
          <MyTextInput name="city" placeholder="City" />
          <MyTextInput name="venue" placeholder="Venue" />
          <MyTextInput name="date" placeholder="Event date" type="date" />

          <Button type="submit" floated="right" positive content="Submit" />
          <Button
            type="submit"
            floated="right"
            content="Cancel"
            as={Link}
            to="/events"
          />
        </Form>
      </Formik>
    </Segment>
  );
}
