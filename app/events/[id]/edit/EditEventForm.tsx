'use client';

import { useActionState } from 'react';
import { updateEventAction } from '../../actions';

type EventData = {
  id: number;
  title: string;
  description: string;
  date: string;
  venue: string;
  ticketPrice: number;
};

function toDateTimeLocal(date: Date) {
  const pad = (number: number) => String(number).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function EditEventForm({ event }: { event: EventData }) {
  const action = updateEventAction.bind(null, event.id);
  const [error, formAction, pending] = useActionState(action, null);

  return <section className="card"><h1>Edit event</h1>{error && <p className="error">{error}</p>}<form action={formAction}><label>Title<input name="title" defaultValue={event.title} required /></label><label>Description<textarea name="description" defaultValue={event.description} required /></label><label>Date and time<input name="date" type="datetime-local" defaultValue={toDateTimeLocal(new Date(event.date))} required /></label><label>Venue<input name="venue" defaultValue={event.venue} required /></label><label>Ticket price<input name="ticketPrice" type="number" min="0" step="0.01" defaultValue={event.ticketPrice} required /></label><button disabled={pending} type="submit">Update event</button></form></section>;
}
