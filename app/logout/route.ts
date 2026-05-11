import { redirect } from 'next/navigation';
import { destroySession } from '@/src/lib/session';

export async function POST() {
  await destroySession();
  redirect('/');
}
