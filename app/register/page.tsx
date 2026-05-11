'use client';

import { useActionState } from 'react';
import { registerAction } from './actions';

export default function RegisterPage() {
  const [error, formAction, pending] = useActionState(registerAction, null);
  return <section className="card"><h1>Create account</h1>{error && <p className="error">{error}</p>}<form action={formAction}><label>Name<input name="name" minLength={2} required /></label><label>Email<input name="email" type="email" required /></label><label>Password<input name="password" type="password" minLength={6} required /></label><button disabled={pending} type="submit">Register</button></form></section>;
}
