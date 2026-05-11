'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { prisma } from '@/src/lib/prisma';
import { createSession } from '@/src/lib/session';
import { isValidEmail, requireText } from '@/src/lib/validators';

export async function registerAction(_: string | null, formData: FormData) {
  try {
    const name = requireText(formData.get('name'), 'Name');
    const email = requireText(formData.get('email'), 'Email').toLowerCase();
    const password = requireText(formData.get('password'), 'Password');

    if (!isValidEmail(email)) return 'Please enter a valid email address.';
    if (password.length < 6) return 'Password must be at least 6 characters.';

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return 'This email is already registered.';

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name, email, password: hashedPassword } });
    await createSession(user.id);
  } catch (error) {
    return error instanceof Error ? error.message : 'Registration failed.';
  }
  redirect('/events');
}
