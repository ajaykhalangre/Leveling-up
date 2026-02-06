# Formatted Project

Structure:
- frontend/: HTML/CSS/JS files
  - login.html -> profile.html -> home.html -> action pages (task, skills, reminder, blog, reward)
- backend/: Node.js Express server that serves the frontend and provides simple JSON endpoints
  - server.js, package.json
  - data/: JSON files used as simple storage

How to run:
1. Install Node.js (v14+).
2. Open a terminal in backend/ and run:
   npm install
   npm start
3. Open http://localhost:3000/frontend/login.html in your browser.

Notes:
- This is a minimal template. It uses flat JSON files in backend/data for storage.
- You can adapt server.js to use a real database (SQLite, MongoDB, Supabase) later.
