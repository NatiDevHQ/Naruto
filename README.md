# Natnael's Portfolio

A dynamic, full-stack portfolio web application built with HTML, CSS, JavaScript (Frontend) and Node.js, Express, MongoDB (Backend). 

## Features Added & Architecture
- **Dynamic Data Fetching**: Migrated from hardcoded frontend data to a MongoDB backend. The frontend now dynamically fetches profile information and projects.
- **Backend API**: A complete RESTful API built with Express.js and Mongoose for managing the profile and projects.
- **Admin Modals**: "Edit Profile" and "Add Project" modals allowing real-time updates directly from the frontend, which instantly sync with the database.
- **Perfect Avatar Interaction**: Keywords in the profile description (e.g., "full-stack development", "UI/UX design") are parsed dynamically and highlighted, triggering the avatar progress interaction.
- **Toast Notifications**: Modern, auto-hiding toast messages for successful actions like updating the profile, adding projects, deleting projects, and highlighting skills.
- **Seeding Script**: A robust `seed.js` utility to easily populate the database with initial portfolio data, storing clean plain-text to ensure easy editing.

## Project Structure
```text
├── backend/
│   ├── config/          # Database configuration (db.js)
│   ├── controllers/     # API logic for Profile and Projects
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express API routes
│   ├── .env             # Environment variables (Port, Mongo URI)
│   ├── seed.js          # Database seeding script
│   └── server.js        # Entry point for the Express server
└── frontend/
    ├── css/             # Stylesheets (style.css)
    ├── images/          # Image assets
    ├── js/              # Frontend logic (script.js)
    ├── videos/          # Video assets
    └── index.html       # Main portfolio UI
```

## How the Frontend & Backend are Connected
The frontend acts as a Single Page Application (SPA) communicating with the backend via the native `fetch` API in `frontend/js/script.js`. 
- **Initialization**: Upon loading (`DOMContentLoaded`), `fetchPortfolioData()` is called to retrieve the `Profile` and `Projects` from `http://localhost:3000/api/...` and seamlessly populate the DOM.
- **Data Mutability**: Admin actions (submitting the edit profile form, adding a project, or deleting a project) trigger `POST`, `PUT`, or `DELETE` requests to the respective endpoints.
- **State Updates**: Upon successful save responses, the UI dynamically refreshes specific components (like the project grid or profile text) and displays a success Toast notification without requiring a full page reload.
- **CORS**: The Express server has CORS middleware enabled to seamlessly accept requests from the frontend HTML file.

## Getting Started

### Prerequisites
- Node.js installed on your machine
- A MongoDB URI (MongoDB Atlas or local)

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables by creating a `.env` file in the `backend` directory (if not already present):
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Seed the database with the initial data (this will populate your profile text and initial projects):
   ```bash
   node seed.js
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server will run on `http://localhost:3000`.*

### Frontend Setup
1. You can simply open the `frontend/index.html` file in your preferred web browser. Alternatively, use a local development server (like VS Code's Live Server extension) to serve the `frontend` directory.
2. The UI will automatically fetch data from the running backend. 
3. **Testing Integrations:**
   - Click the **Edit Profile** button (pencil icon) to open the modal, change some text, and hit save to see the database and UI update simultaneously along with a toast notification.
   - Click **Add Project** to test the `POST` integration.
   - Click the trash can icon on any project to test the `DELETE` integration.

---
*dev ❤️ by Natnael Getachew — Always Building, Always Learning.*
