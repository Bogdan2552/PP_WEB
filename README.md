# Event Manager — Next.js + Prisma Practical Project Starter

This project is a full-stack **Event Manager** web application built for the Web Programming practical project. It includes registration, login, logout, a home page, event list, event details, create, edit, and delete functionality.

Important: your assignment says you may use AI for support, but you should not submit a full generated project that you cannot explain. Use this as a strong starter: run it, read the code, make your own styling/content changes, create your own screenshots, and commit your work in several meaningful steps.

## Technologies

- Next.js App Router
- React Server Components and Server Actions
- TypeScript
- Prisma ORM
- SQLite database
- bcryptjs for password hashing
- Signed HTTP-only cookie session

## Main database models

- `User`: name, email, hashed password, timestamps
- `Event`: title, description, date, venue, ticketPrice, timestamps, author relation

Each event belongs to the user who created it. Only the owner can edit or delete their own events.

## Pages and routes

- `/` — Home page
- `/register` — Create account
- `/login` — Login
- `/logout` — Logout POST route
- `/events` — List/read all events
- `/events/new` — Create event
- `/events/[id]` — Event details page
- `/events/[id]/edit` — Edit event

## How to set up and run

### 1. Install Node.js

Install Node.js 20 or newer from the official Node.js website.

Check installation:

```bash
node -v
npm -v
```

### 2. Open the project folder

```bash
cd event-manager-next-prisma
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create environment file

Copy the example file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

The `.env` file should contain:

```env
DATABASE_URL="file:./dev.db"
SESSION_SECRET="change-this-to-a-long-random-secret"
```

For your own submission, replace `SESSION_SECRET` with a longer random value.

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Run database migration

```bash
npx prisma migrate dev
```

When Prisma asks for a migration name, use:

```text
init
```

This creates a local SQLite database at `prisma/dev.db`.

### 7. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Main user flow

1. Open the home page.
2. Register a new account with name, email, and password.
3. You are redirected to the events page.
4. Create a new event.
5. Open the event details page.
6. Edit the event.
7. Delete the event.
8. Log out and try to access protected actions.

## Validation and errors included

- Required text fields are checked.
- Email format is validated.
- Duplicate emails are prevented.
- Password must be at least 6 characters.
- Wrong login credentials show an error.
- Missing records show a 404 page through `notFound()`.
- Edit and delete actions check event ownership.

## Suggested Git commit history

Do not make only one final commit. Suggested commits:

```bash
git init
git add package.json tsconfig.json next.config.ts .gitignore .env.example
git commit -m "Initialize Next.js project"

git add prisma
git commit -m "Add Prisma schema and initial migration"

git add src/lib app/register app/login app/logout
git commit -m "Implement authentication flow"

git add app/events
git commit -m "Add event CRUD pages"

git add app/globals.css README.md public/screenshots
git commit -m "Improve styling and documentation"
```

## Development log

- Created the project structure with Next.js App Router.
- Designed the Prisma schema with a `User` model and an `Event` model.
- Added SQLite migration for the two required tables.
- Implemented registration with password hashing and duplicate email validation.
- Implemented login/logout using a signed HTTP-only cookie.
- Added event list, details, create, edit, and delete pages.
- Added ownership checks so users can edit and delete only their own events.
- Added simple responsive CSS for usability on smaller screens.

## What you should customize before submission

- Change colors, layout, text, and event examples.
- Add your own screenshots from the running app.
- Make several Git commits while testing.
- Be ready to explain:
  - how password hashing works,
  - how the session cookie is signed,
  - how Prisma queries create/read/update/delete events,
  - how the owner check prevents unauthorized edits/deletes.

## Screenshots

Sample placeholder screenshots are in `public/screenshots`. Replace them with real screenshots after running the app locally:

- `register.svg`
- `login.svg`
- `home.svg`
- `list.svg`
- `create.svg`
- `edit.svg`
- `details.svg`
