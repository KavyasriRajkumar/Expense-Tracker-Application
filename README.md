# Expense Tracker (React + Express + MongoDB)

Combined from the uploaded CSS-master frontend and Application backend. Features: add, edit, delete, list expenses; signed amounts (positive = income, negative = expense); balance summary. The original UI is retained.

## Requirements
- Node.js 20+ and npm
- MongoDB Atlas or local MongoDB

## Setup
1. In `backend`, run `npm install`.
2. Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI` to your **own** MongoDB connection string. Never commit `.env`.
3. Run `npm run dev` inside `backend`. The API is at `http://localhost:3000/api/expenses`.
4. In a second terminal, run `npm install` then `npm run dev` inside `frontend`.
5. Open the URL printed by Vite (usually `http://localhost:5173`).

## Test
- Open `/api/expenses` in browser (should show JSON array).
- Add a positive amount (income), then a negative amount (expense).
- Edit, delete, refresh, and confirm persistence.

## API
- `GET /api/expenses`
- `POST /api/expenses` with `{ "title": "Lunch", "amount": -150 }`
- `PUT /api/expenses/:id` with `{ "title": "Dinner", "amount": -200 }`
- `DELETE /api/expenses/:id`

## Security
The uploaded backend contained an embedded MongoDB Atlas credential. It has been removed from this project. **Rotate/revoke the original Atlas database password before publishing**, even if this clean ZIP does not include it. Do not commit your `.env` file.

## Notes
- Install dependencies separately in frontend and backend.
- Backend starts only after MongoDB connects.
- The frontend defaults to localhost:3000. For another API host, set `VITE_API_URL` in `frontend/.env`.
