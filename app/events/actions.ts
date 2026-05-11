'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/src/lib/prisma';
import { getCurrentUser } from '@/src/lib/session';
import { parseEventDate, parseTicketPrice, requireText } from '@/src/lib/validators';

function readEventForm(formData: FormData) {
  const title = requireText(formData.get('title'), 'Title');
  const description = requireText(formData.get('description'), 'Description');
  const venue = requireText(formData.get('venue'), 'Venue');
  const date = parseEventDate(formData.get('date'));
  const ticketPrice = parseTicketPrice(formData.get('ticketPrice'));
  return { title, description, venue, date, ticketPrice };
}

export async function createEventAction(_: string | null, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) return 'You must be logged in to create an event.';

  let eventId: number;
  try {
    const data = readEventForm(formData);
    const event = await prisma.event.create({ data: { ...data, authorId: user.id } });
    eventId = event.id;
  } catch (error) {
    return error instanceof Error ? error.message : 'Could not create event.';
  }
  redirect(`/events/${eventId}`);
}

export async function updateEventAction(eventId: number, _: string | null, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) return 'You must be logged in.';

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) return 'Event not found.';
  if (event.authorId !== user.id) return 'You can edit only your own events.';

  try {
    const data = readEventForm(formData);
    await prisma.event.update({ where: { id: eventId }, data });
  } catch (error) {
    return error instanceof Error ? error.message : 'Could not update event.';
  }
  redirect(`/events/${eventId}`);
}

export async function deleteEventAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const eventId = Number(formData.get('eventId'));
  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) redirect('/events');
  if (event.authorId !== user.id) redirect(`/events/${eventId}`);

  await prisma.event.delete({ where: { id: eventId } });
  redirect('/events');
}
