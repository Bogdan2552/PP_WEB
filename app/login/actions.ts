'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { prisma } from '@/src/lib/prisma';
import { createSession } from '@/src/lib/session';
import { isValidEmail, requireText } from '@/src/lib/validators';

export async function loginAction(_: string | null, formData: FormData) {
  const email = requireText(formData.get('email'), 'Email').toLowerCase();
  const password = requireText(formData.get('password'), 'Password');

  if (!isValidEmail(email)) return 'Please enter a valid email address.';

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return 'Invalid email or password.';

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) return 'Invalid email or password.';

  await createSession(user.id);
  redirect('/events');
}
