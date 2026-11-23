require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());
const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  amount: { type: Number, required: true }
});
const Expense = mongoose.model('Expense', expenseSchema);
app.get('/api/expenses', async (req, res) => {
  try { res.json(await Expense.find().sort({ _id: -1 })); }
  catch (error) { res.status(500).json({ message: 'Unable to load expenses' }); }
});
app.post('/api/expenses', async (req, res) => {
  try { res.status(201).json(await Expense.create(req.body)); }
  catch (error) { res.status(400).json({ message: 'Invalid expense data' }); }
});
app.put('/api/expenses/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });
    const updated = await Expense.findByIdAndUpdate(req.params.id, { title: req.body.title, amount: req.body.amount }, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Expense not found' });
    res.json(updated);
  } catch (error) { res.status(400).json({ message: 'Unable to update expense' }); }
});
app.delete('/api/expenses/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid ID' });
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Deleted' });
  } catch (error) { res.status(500).json({ message: 'Unable to delete expense' }); }
});
if (!process.env.MONGO_URI) { console.error('Missing MONGO_URI in backend/.env'); process.exit(1); }
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`)))
  .catch(error => { console.error('MongoDB connection failed:', error.message); process.exit(1); });
