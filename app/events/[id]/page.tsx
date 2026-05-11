import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/src/lib/prisma';
import { getCurrentUser } from '@/src/lib/session';
import { deleteEventAction } from '../actions';

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const eventId = Number(id);
  if (!Number.isInteger(eventId)) notFound();

  const [event, user] = await Promise.all([
    prisma.event.findUnique({ where: { id: eventId }, include: { author: { select: { id: true, name: true, email: true } } } }),
    getCurrentUser(),
  ]);
  if (!event) notFound();
  const isOwner = user?.id === event.authorId;

  return <section className="card"><h1>{event.title}</h1><p className="event-meta">{event.date.toLocaleString()} · {event.venue}</p><p>{event.description}</p><p><strong>Ticket price:</strong> ${event.ticketPrice.toFixed(2)}</p><p className="muted">Created by {event.author.name}</p><div className="actions"><Link className="btn secondary" href="/events">Back to list</Link>{isOwner && <><Link className="btn" href={`/events/${event.id}/edit`}>Edit</Link><form action={deleteEventAction}><input type="hidden" name="eventId" value={event.id} /><button className="danger" type="submit">Delete</button></form></>}</div>{!user && <p className="muted">Login to create your own events.</p>}</section>;
}
