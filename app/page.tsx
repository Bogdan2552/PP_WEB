import Link from 'next/link';
import { getCurrentUser } from '@/src/lib/session';

export default async function HomePage() {
  const user = await getCurrentUser();
  return <section className="card"><h1>Event Manager</h1><p className="muted">A full-stack Next.js app with registration, login, Prisma SQLite database access, and CRUD operations for events.</p><div className="actions"><Link className="btn" href="/events">View events</Link>{user ? <Link className="btn secondary" href="/events/new">Create your event</Link> : <><Link className="btn secondary" href="/login">Login</Link><Link className="btn secondary" href="/register">Register</Link></>}</div></section>;
}
