# Travel Unbounded — Decoupled Frontend & Backend Monorepo

A decoupled, production-ready travel company application built for **Travel Unbounded** to capture travel bookings, view office locations, and explore destinations.

This project is structured as a monorepo consisting of:
1. **Frontend**: Next.js client application (handles pages, layouts, user flows, and client-side form validations).
2. **Backend**: Node.js/Express.js server application (handles Mongoose schemas, database integration, and strict server-side validation).

---

## Tech Stack
* **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS (v4), Lucide Icons
* **Backend**: Node.js, Express.js, Mongoose (MongoDB ODM), CORS, Dotenv
* **Deployment**: Render (via unified Blueprints)

---

## Project Structure
```text
Travel_unbounded/
├── frontend/             # Next.js UI client (React, Tailwind)
│   ├── src/
│   │   ├── app/          # App router pages (Home, About, Contact)
│   │   ├── components/   # Navbar, Footer, DestinationCard, BookingForm
│   │   └── data/         # Static destinations JSON
│   ├── package.json
│   └── next.config.mjs
│
├── backend/              # Node/Express API server
│   ├── models/           # Mongoose schemas (Enquiry)
│   ├── server.js         # Entry script (Express application, CORS, DB)
│   └── package.json
│
├── .gitignore            # Global ignore configuration
├── README.md             # This document
└── render.yaml           # Unified Render Monorepo Blueprint
```

---

## Local Setup & Development

To test the decoupled setup locally, you will run the backend on port `5000` and the frontend on port `3000`.

### 1. Set Up the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file inside the `backend/` folder:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_uri
   FRONTEND_URL=http://localhost:3000
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *(Ensure MongoDB is running or connected. You should see "Connected to MongoDB successfully.")*

### 2. Set Up the Frontend
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file inside the `frontend/` folder:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Deployment (Render Blueprint)

We have configured a unified `render.yaml` blueprint in the repository root. When you connect this repository to Render:

1. **Log in** to your [Render Dashboard](https://dashboard.render.com/).
2. Select **Blueprints** and click **New Blueprint Instance**.
3. Connect your repository. Render will automatically detect `render.yaml` and configure:
   - `travel-unbounded-api`: A Node.js Web Service for the Express backend.
   - `travel-unbounded-web`: A Node.js Web Service for the Next.js frontend.
4. Input your `MONGODB_URI` environment variable when prompted.
5. Render will automatically link the backend's URL to the frontend's `NEXT_PUBLIC_API_URL` variable.
6. Click **Approve**.

---

## API Documentation

### `POST /api/enquiry`
* **Target Host**: `http://localhost:5000` (or your deployed backend host)
* **Payload Format (JSON)**:
  ```json
  {
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "countryCode": "+91",
    "contactNumber": "9876543210",
    "preferredDestination": "Kerala",
    "dateOfTravel": "2026-12-31",
    "numberOfPeople": 2,
    "hotelCategory": "Deluxe",
    "numberOfChildren": 0
  }
  ```
* **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Enquiry submitted successfully",
    "data": { ...savedEnquiry }
  }
  ```

### `GET /api/enquiry`
Retrieves all enquiries sorted by creation date descending.
