import React, { useState } from 'react';
import styles from './ExpenseForm.module.css';
import ExpenseList from './ExpenseList';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data={
      amount:moneySpent,
      description:description,
      category:selectedCategory
    }
    setExpenses([...expenses, data]);

    setMoneySpent('');
    setDescription('');
    setSelectedCategory('');
  };

  return (
    <div className={styles.expenseForm}>
      <h2>Expense Tracker</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Money Spent"
          value={moneySpent}
          onChange={(e) => setMoneySpent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          required
        >
          <option value="" disabled>Select Category</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default Expenses;
