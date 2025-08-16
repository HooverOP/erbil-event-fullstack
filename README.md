# Erbil Event Registration System

This is a [Next.js](https://nextjs.org) full-stack application built for registering participants in events held in Erbil. It includes a landing page that lists events, a registration form, and an admin view for registered participants.

The backend is implemented using Next.js API routes, with local JSON files as storage for simplicity.

---

## Getting Started

### Personal Documentation

[Google Docs.](https://docs.google.com/document/d/18Kx4kuT3WMud1KfYBvUClka2sNp2oKzul4F4C7Agviw/edit?usp=sharing)

### 1. Install Dependencies

Before running the app, make sure you have **Node.js** installed.

Then install the required packages:

```bash
npm install
```

This step is required the **first time** you run the project or whenever new dependencies are added.

---

## How to Run the Frontend

To start the frontend and backend (handled together in Next.js), run:

```bash
npm run dev
```

This will start the development server on:

> http://localhost:3000

You can open this URL in your browser to use the app.

---

## How to Run the Backend

The backend API is powered by Next.js API routes located under `/app/api`.

Since this is a unified full-stack app, running `npm run dev` will also start the backend.

By default, all API routes are available under:

> http://localhost:3000/api/

For example:

- GET events → `http://localhost:3000/api/events`
- POST registration → `http://localhost:3000/api/register`
- GET registered users → `http://localhost:3000/api/registered`

No separate port is required.

---

## Folder Structure

```bash
/app
  ├── page.tsx                 # Landing page (events list)
  ├── register/page.tsx        # Registration form
  ├── participants/page.tsx    # Registered participants list
  └── api
      ├── events/route.ts      # GET /api/events
      ├── register/route.ts    # POST /api/register
      └── registered/route.ts  # GET /api/registered

/lib
  └── db.ts                    # Logic to read/write JSON files

/types
  └── index.ts                 # TypeScript types

/data
  └── events.json              # Sample events
  └── registered.json          # Registered users
```

---

## Developer

**Name:** Vache Aqob

---

## Learn More

To learn more about Next.js:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

---

## Deployment

You can deploy this project using [Vercel](https://vercel.com), which is the recommended way to host Next.js apps.

More deployment info: [Deploying Next.js](https://nextjs.org/docs/app/building-your-application/deploying)

Suggetions are accepeted
