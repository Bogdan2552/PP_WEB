import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/src/lib/prisma';
import { getCurrentUser } from '@/src/lib/session';
import EditEventForm from './EditEventForm';

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const { id } = await params;
  const eventId = Number(id);
  if (!Number.isInteger(eventId)) notFound();

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) notFound();
  if (event.authorId !== user.id) redirect(`/events/${eventId}`);

  return <EditEventForm event={{ ...event, date: event.date.toISOString() }} />;
}
