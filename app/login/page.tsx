'use client';

import { useActionState } from 'react';
import { loginAction } from './actions';

export default function LoginPage() {
  const [error, formAction, pending] = useActionState(loginAction, null);
  return <section className="card"><h1>Login</h1>{error && <p className="error">{error}</p>}<form action={formAction}><label>Email<input name="email" type="email" required /></label><label>Password<input name="password" type="password" required /></label><button disabled={pending} type="submit">Login</button></form></section>;
}
