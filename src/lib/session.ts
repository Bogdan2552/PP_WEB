import { cookies } from 'next/headers';
import crypto from 'crypto';
import { prisma } from './prisma';

const COOKIE_NAME = 'event_manager_session';

function getSecret() {
  return process.env.SESSION_SECRET || 'dev-secret-change-me';
}

function sign(value: string) {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('hex');
}

export async function createSession(userId: number) {
  const value = String(userId);
  const token = `${value}.${sign(value)}`;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const [id, signature] = token.split('.');
  if (!id || !signature || sign(id) !== signature) return null;

  const userId = Number(id);
  if (!Number.isInteger(userId)) return null;

  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true },
  });
}
