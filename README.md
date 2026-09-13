# Ananya — CSE Student Portfolio

A full-stack personal portfolio website for a 2nd-year Computer Science and
Engineering student. Built with React (Vite) on the frontend and
Node.js/Express + MongoDB on the backend.

---

## 1. Project Overview

This project showcases a student's introduction, skills, education,
projects, internship experience, achievements, institutional/industrial
visits, coding activity, resume, and a working contact form backed by a
real database.

All personal content lives in one place —
`client/src/data/portfolioData.js` — so you can update your info without
touching any component code.

---

## 2. Features

- Responsive navbar with animated mobile hamburger menu and smooth scrolling
- Hero, About, Skills, Education (timeline), Projects, Experience,
  Institutional/Industrial Visits, Achievements, Coding/LeetCode, Contact
- Projects are stored in MongoDB and rendered dynamically through a
  reusable `ProjectCard` component — the **frontend automatically falls
  back to local sample data** if the backend/database isn't reachable, so
  the site never looks broken or empty
- Contact form with client-side validation, loading/success/error states,
  and no page reload
- Basic `/admin` page for managing projects (Create/Read/Update/Delete),
  clearly marked as an **unauthenticated development page**
- Centralized API service (`client/src/services/api.js`) — no scattered
  `fetch` calls
- Centralized Express error handling with clean HTTP status codes and no
  leaked stack traces
- Graceful handling of: missing resume file, broken/missing images, API
  errors, empty project lists, invalid MongoDB ObjectIds, and more
- Accessible markup: semantic HTML, labeled form fields, visible focus
  states, alt text, skip-to-content link

---

## 3. Tech Stack

**Frontend:** React 18, Vite, React Router, plain CSS (CSS variables)
**Backend:** Node.js, Express
**Database:** MongoDB with Mongoose
**Tools:** npm, Git

---

## 4. Folder Structure

```
portfolio/
├── client/                    # React frontend
│   ├── public/
│   │   ├── images/
│   │   └── Ananya_Resume.pdf  # ← add your own resume here (see section 16)
│   ├── src/
│   │   ├── components/        # Navbar, Hero, About, Skills, Education,
│   │   │                        Projects, ProjectCard, Experience,
│   │   │                        Achievements, Coding, Contact, Footer,
│   │   │                        ErrorBoundary + matching CSS files
│   │   ├── pages/              # Home.jsx, Admin.jsx
│   │   ├── data/portfolioData.js  # ← EDIT YOUR CONTENT HERE
│   │   ├── services/api.js     # centralized API calls
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css           # design tokens + global styles
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── server/                    # Express backend
│   ├── config/db.js
│   ├── controllers/           # projectController.js, contactController.js
│   ├── models/                # Project.js, Contact.js
│   ├── routes/                # projectRoutes.js, contactRoutes.js
│   ├── middleware/errorMiddleware.js
│   ├── seed/seedProjects.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## 5. Installation

You'll need:
- **Node.js 18+** and npm
- A **MongoDB** database — either a local MongoDB install or a free
  [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

Clone or unzip the project, then install dependencies for both apps:

```bash
cd portfolio/client
npm install

cd ../server
npm install
```

> **Note on this environment:** these files were generated and
> syntax-verified in a sandbox with no internet access, so `npm install`
> could not actually be executed here. Every `.js`/`.jsx` file was checked
> for syntax errors using the TypeScript compiler and `node --check`, and
> the code was carefully reviewed against the Express/Mongoose/React APIs
> it uses — but you should run `npm install` and the dev servers yourself
> the first time, and open an issue-style note to yourself for anything
> that looks off (there shouldn't be, but real installs are the ultimate
> test). Everything below assumes a normal environment with internet
> access.

---

## 6. Frontend Setup

```bash
cd client
cp .env.example .env
```

Edit `.env` if your backend runs somewhere other than
`http://localhost:5000`:

```
VITE_API_URL=http://localhost:5000/api
```

---

## 7. Backend Setup

```bash
cd server
cp .env.example .env
```

Edit `.env`:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

---

## 8. MongoDB Setup

**Option A — MongoDB Atlas (recommended, free tier available):**
1. Create a free cluster at https://www.mongodb.com/atlas
2. Create a database user and password
3. Under Network Access, allow your IP (or `0.0.0.0/0` for development)
4. Copy the connection string and paste it into `server/.env` as
   `MONGODB_URI`, replacing `<password>` with your actual password

**Option B — Local MongoDB:**
1. Install MongoDB Community Server
2. Start it (`mongod`)
3. Use `MONGODB_URI=mongodb://localhost:27017/portfolio`

---

## 9. Running Locally

Open two terminals.

**Terminal 1 — backend:**
```bash
cd server
npm run dev
```
You should see `Portfolio API running on http://localhost:5000`.

**Terminal 2 — frontend:**
```bash
cd client
npm run dev
```
Visit the printed URL (usually `http://localhost:5173`).

If the backend or database isn't running yet, the Projects section will
automatically show local sample data instead of breaking — connect the
backend whenever you're ready.

---

## 10. Seeding the Database

Once `server/.env` has a valid `MONGODB_URI`:

```bash
cd server
npm run seed
```

This clears any existing `projects` collection data and inserts the three
starter projects (EcoChat, SolarSense, Automatic Night Light). Safe to
re-run any time.

---

## 11. API Endpoints

| Method | Endpoint              | Description                     |
|--------|------------------------|----------------------------------|
| GET    | `/api/health`          | Health check (server + DB status) |
| GET    | `/api/projects`        | Get all projects                |
| GET    | `/api/projects/:id`    | Get a single project by ID      |
| POST   | `/api/projects`        | Create a project                |
| PUT    | `/api/projects/:id`    | Update a project                |
| DELETE | `/api/projects/:id`    | Delete a project                |
| POST   | `/api/contact`         | Submit a contact form message   |

All responses follow the shape `{ success, data }` or
`{ success: false, message }` on error.

---

## 12. Deployment

**Frontend → Vercel**
1. Push the repo to GitHub
2. Import the project in Vercel, set the root directory to `client`
3. Set the environment variable `VITE_API_URL` to your deployed backend's
   URL (e.g. `https://your-api.onrender.com/api`)
4. Deploy — Vercel auto-detects Vite

**Backend → Render or Railway**
1. Create a new Web Service from your GitHub repo, root directory `server`
2. Build command: `npm install` — Start command: `npm start`
3. Add environment variables: `PORT` (usually auto-set by the platform),
   `MONGODB_URI`, and `CLIENT_URL` (your deployed Vercel URL)
4. Deploy

**Database → MongoDB Atlas**
- Already covered in section 8. Make sure Atlas's Network Access allows
  connections from your backend host (or `0.0.0.0/0` for simplicity).

**CORS**
- The backend only allows requests from `CLIENT_URL`. Update this env var
  on your backend host to match your deployed frontend's exact URL
  (including `https://`).

---

## 13. Troubleshooting

| Problem | Likely cause | Fix |
|---|---|---|
| Projects section shows sample data only | Backend not running or `VITE_API_URL` wrong | Start the backend, check the `.env` value |
| "Unable to reach the server" on contact form | Backend down, or CORS blocking the request | Check backend is running and `CLIENT_URL` matches your frontend origin exactly |
| Backend crashes on startup | Missing `MONGODB_URI` | Copy `.env.example` to `.env` and set a real connection string |
| `/admin` shows no projects | Database not seeded yet | Run `npm run seed` in `server/` |
| Resume button does nothing / 404s | `Ananya_Resume.pdf` not added | Place your resume PDF at `client/public/Ananya_Resume.pdf` |
| Mobile menu doesn't close after clicking a link | Should be automatic — hard refresh and clear cache | If it persists, check `Navbar.jsx` for the `closeMenu` handler |
| `npm install` fails | No internet access, or Node version too old | Ensure Node 18+ and a working internet connection |

---

## 14. Editing Your Content

Everything personal — name, tagline, education, projects, experience,
achievements, visits, LeetCode/GitHub/LinkedIn URLs — is centralized in:

```
client/src/data/portfolioData.js
```

Fields marked `EDIT ME` are placeholders and should be replaced with your
real information before publishing.

---

## 15. Known Limitations / Manual Steps

- The `/admin` page has **no authentication**. It's fine for local use or
  a private deployment, but add real auth (e.g. a JWT login flow with a
  protected route + backend middleware) before making it public.
- You must supply your own `Ananya_Resume.pdf`, LeetCode/GitHub/LinkedIn
  URLs, education details, and achievement/visit descriptions — no fake
  content was invented.
- MongoDB must be provisioned (Atlas or local) — it is not bundled.
