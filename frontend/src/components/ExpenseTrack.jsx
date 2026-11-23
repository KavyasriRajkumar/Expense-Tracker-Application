import { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseSummary from './ExpenseSummary';
import './Stylecss.css';
const API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/expenses';
export default function ExpenseTrack() {
  const [expenses, setExpenses] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    axios.get(API).then(res => setExpenses(res.data)).catch(() => setError('Cannot load expenses. Check that the backend and MongoDB are running.'));
  }, []);
  const addExpense = async (title, amount, id = null) => {
    try {
      setError('');
      if (id) {
        const { data } = await axios.put(`${API}/${id}`, { title, amount: Number(amount) });
        setExpenses(prev => prev.map(exp => exp._id === id ? data : exp));
        setItemToEdit(null);
      } else {
        const { data } = await axios.post(API, { title, amount: Number(amount) });
        setExpenses(prev => [data, ...prev]);
      }
    } catch { setError('Unable to save expense. Please try again.'); }
  };
  const deleteExpense = async id => {
    try {
      setError('');
      await axios.delete(`${API}/${id}`);
      setExpenses(prev => prev.filter(exp => exp._id !== id));
      if (itemToEdit?._id === id) setItemToEdit(null);
    } catch { setError('Unable to delete expense. Please try again.'); }
  };
  return <div className="expense-container">
    <h1>Expense Tracker</h1>
    {error && <p role="alert" style={{ color: '#b42318' }}>{error}</p>}
    <ExpenseForm addExpense={addExpense} itemToEdit={itemToEdit} setItemToEdit={setItemToEdit} />
    <ExpenseSummary expenses={expenses} />
    <ExpenseList expenses={expenses} deleteExpense={deleteExpense} editExpense={setItemToEdit} />
  </div>;
}
