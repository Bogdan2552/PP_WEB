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
SESSION_SECRET="WHERES_OMNI_MAN_WHERES_HE?"
```
### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Run database migration

```bash
npx prisma migrate dev
```
### 7. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```