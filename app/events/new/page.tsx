'use client';

import { useActionState } from 'react';
import { createEventAction } from '../actions';

export default function NewEventPage() {
  const [error, formAction, pending] = useActionState(createEventAction, null);
  return <section className="card"><h1>Create event</h1>{error && <p className="error">{error}</p>}<form action={formAction}><label>Title<input name="title" required /></label><label>Description<textarea name="description" required /></label><label>Date and time<input name="date" type="datetime-local" required /></label><label>Venue<input name="venue" required /></label><label>Ticket price<input name="ticketPrice" type="number" min="0" step="0.01" required /></label><button disabled={pending} type="submit">Save event</button></form></section>;
}
