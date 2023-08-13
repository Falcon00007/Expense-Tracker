import React, { useEffect, useState } from 'react';
import styles from './ExpenseForm.module.css';
import ExpenseList from './ExpenseList';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const expenseData={
      amount:moneySpent,
      description:description,
      category:selectedCategory
    }
    fetch(
      "https://expense-tracker-25433-default-rtdb.firebaseio.com/userExpenses.json",
      {
        method: "POST",
        body: JSON.stringify(expenseData),
        headers: {
          "Content-Type": "application/json",
        }
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Expense added successfully!', data);
      setExpenses((prevExpenses)=>[...prevExpenses, expenseData]); // Optionally, you can add the expense to the context as well.
      alert('Expense Added Successfully');
    })
    .catch((error) => {
      console.error('Error adding expense:', error);
      alert('Error adding expense');
    });

    setMoneySpent('');
    setDescription('');
    setSelectedCategory('');
  };

  useEffect(()=>{
    const fetchExpenses = () => {
      fetch(
        "https://expense-tracker-25433-default-rtdb.firebaseio.com/userExpenses.json",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            response.json().then((data) => {
              let errorMessage = "Authotication Failed";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data);
          let arr = [];
          for (let key in data) {
            arr.push({
              description: data[key].description,
              amount: data[key].amount,
              category: data[key].category,
            });
          }
          setExpenses(arr);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchExpenses();
  },[])

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
