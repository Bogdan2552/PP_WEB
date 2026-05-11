import Link from 'next/link';
import { prisma } from '@/src/lib/prisma';
import { getCurrentUser } from '@/src/lib/session';

export default async function EventsPage() {
  const user = await getCurrentUser();
  const events = await prisma.event.findMany({ include: { author: { select: { name: true } } }, orderBy: { date: 'asc' } });
  return <><div className="actions"><h1>Events</h1>{user && <Link className="btn" href="/events/new">Create event</Link>}</div>{events.length === 0 ? <section className="card"><p>No events yet.</p></section> : <div className="grid">{events.map(event => <article className="card event-card" key={event.id}><h2><Link href={`/events/${event.id}`}>{event.title}</Link></h2><p className="event-meta">{event.date.toLocaleDateString()} · {event.venue}</p><p>{event.description.slice(0, 120)}{event.description.length > 120 ? '...' : ''}</p><p className="muted">Created by {event.author.name}</p><Link href={`/events/${event.id}`}>View details</Link></article>)}</div>}</>;
}
