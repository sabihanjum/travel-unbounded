# Travel Unbounded — Full Stack Travel Company Website

A production-style travel company website built for **Travel Unbounded** to showcase destination packages (India and International), share company locations/philosophies, and collect travel enquiries using a validated, database-backed pipeline.

## Live Demo & Repository
- **GitHub Repository**: [https://github.com/sabihanjum/travel-unbounded](https://github.com/sabihanjum/travel-unbounded) *(Placeholder/Replace with actual)*
- **Live Deployment (Vercel)**: [https://travel-unbounded.vercel.app](https://travel-unbounded.vercel.app) *(Placeholder/Replace with actual)*

---

## Tech Stack
* **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS (v4)
* **Backend**: Next.js API Routes (Serverless)
* **Database**: MongoDB Atlas via Mongoose
* **Icons**: Lucide React
* **Deployment**: Vercel

---

## Features
1. **Interactive Responsive Home Page**: Beautiful, immersive hero section, trust badges, and grid sections of Indian & International destination cards.
2. **About Us Page**: Highlights the official company story, Core Values / Philosophy, and cards showing the three office locations (Bengaluru, Kochi, Nairobi).
3. **Smart Booking Enquiry Form**:
   * Dynamic auto-population based on query parameters (e.g. clicking "Enquire" on Kerala auto-selects Kerala in the dropdown).
   * Robust client-side validation (regex email validation, numeric contact validation, date in the future, positive attendee checks).
   * Full-screen/in-place custom confirmation loading and success UI states without raw alert boxes.
4. **Robust Server-side API Validation**: An endpoint at `/api/enquiry` that validates all request inputs before persisting to safeguard the DB from direct calls.
5. **Database Persistence**: Automatic connection pooling, schemas, and timestamps (`createdAt` / `updatedAt`) using Mongoose.
6. **SEO Best Practices**: Customized titles and metadata descriptions on a per-route basis.

---

## Project Structure
```text
Travel_unbounded/
├── .env.example            # Environment variables template
├── eslint.config.mjs       # ESLint configurations
├── next.config.mjs         # Next.js options
├── package.json            # Dependencies (next, react, mongoose, lucide-react)
├── postcss.config.mjs      # PostCSS configuration for Tailwind v4
├── public/                 # Static asset folder
└── src/
    ├── app/                # Next.js App Router folders
    │   ├── api/            # Serverless API routes
    │   │   └── enquiry/    # GET & POST endpoints for booking
    │   │       └── route.js
    │   ├── about/          # About page route
    │   │   └── page.jsx
    │   ├── contact/        # Plan Your Trip form route
    │   │   └── page.jsx
    │   ├── globals.css     # Global styles and Tailwind v4 imports
    │   ├── layout.js       # Main RootLayout containing global Navbar and Footer
    │   └── page.js         # Landing / Home page layout
    ├── components/         # Reusable UI React Components
    │   ├── BookingForm.jsx     # Booking form client component
    │   ├── DestinationCard.jsx # Destination grid card component
    │   ├── Footer.jsx          # Address and link bottom bar
    │   └── Navbar.jsx          # Glassmorphism header with active link states
    ├── data/               # Static dataset configurations
    │   └── destinations.js # India and International static arrays
    ├── lib/                # Database connector helpers
    │   └── mongodb.js      # Global promise-cached Mongoose pooler
    └── models/             # Database document Schemas
        └── Enquiry.js      # Enquiry model with server constraints
```

---

## Local Setup

### 1. Install Dependencies
Make sure you are in the project folder and run:
```bash
npm install
```

### 2. Configure Environment Variables
Create a file named `.env.local` in the root folder (this file is ignored by Git). Paste your MongoDB connection string:
```env
MONGODB_URI=your_mongodb_atlas_connection_string_here
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
To ensure compilation and type safety check:
```bash
npm run build
```

---

## API Endpoints

### `POST /api/enquiry`
Submits a booking enquiry.
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
* **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Enquiry submitted successfully",
    "data": { ...savedEnquiryDocument }
  }
  ```
* **Error Response (400 Bad Request / 500 Server Error)**:
  ```json
  {
    "success": false,
    "message": "Server-side validation failed",
    "errors": {
      "email": "A valid email address is required.",
      "dateOfTravel": "Date of travel must be in the future."
    }
  }
  ```

### `GET /api/enquiry` (Bonus Feature)
Retrieves all enquiries stored in the database, ordered by submission date (newest first). Used to power administrative interfaces.

---

## Assumptions & Features Skipped
1. **Static Destinations**: In accordance with project instructions, destination card databases were omitted in favor of static, performant JS objects (`src/data/destinations.js`).
2. **Direct Booking Checkout**: Financial payment integrations (Razorpay/Stripe) are omitted since this is a booking-enquiry lead capture pipeline rather than a direct ticketing engine.
3. **Admin Dashboard Front-End**: An admin panel was not fully built to stay focused on the core form-to-database pipeline validation. However, the GET API endpoint was built as a bonus feature to lay the groundwork.
