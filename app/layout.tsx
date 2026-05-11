import './globals.css';
import Link from 'next/link';
import { getCurrentUser } from '@/src/lib/session';

export const metadata = { title: 'Event Manager', description: 'Next.js Prisma CRUD project' };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return <html lang="en"><body><nav className="nav"><div className="nav-inner"><Link className="brand" href="/">Event Manager</Link><div className="nav-links"><Link href="/events">Events</Link>{user ? <><Link href="/events/new">Create Event</Link><span className="muted">Hi, {user.name}</span><form action="/logout" method="post"><button className="btn secondary" type="submit">Logout</button></form></> : <><Link href="/login">Login</Link><Link href="/register">Register</Link></>}</div></div></nav><main className="container">{children}</main></body></html>;
}
