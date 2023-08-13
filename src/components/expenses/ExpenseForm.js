import React, { useEffect, useState } from 'react';
import styles from './ExpenseForm.module.css';
import ExpenseList from './ExpenseList';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isEdit, setEdit] = useState(false);
  const [expenseId, setExpenseId] = useState(null);
  const userEmail= localStorage.getItem("email");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit === true) {    
      const expenseData = {
        amount: moneySpent,
        description: description,
        category: selectedCategory,
      };
      fetch(
        `https://expense-tracker-25433-default-rtdb.firebaseio.com/userExpenses${userEmail}/${expenseId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(expenseData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          console.log(response);
          fetchExpenses();
        })
        .catch((err) => {
          alert("Not able to edit successfully - " + err);
        });
    } else{
       const expenseData={
      amount:moneySpent,
      description:description,
      category:selectedCategory
    }
    fetch(
      `https://expense-tracker-25433-default-rtdb.firebaseio.com/userExpenses${userEmail}.json`,
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
      const expenseDataWithId={...expenseData, id:data.name}
      setExpenses((prevExpenses)=>[...prevExpenses, expenseDataWithId]); // Optionally, you can add the expense to the context as well.
     fetchExpenses();
      alert('Expense Added Successfully');
    })
    .catch((error) => {
      console.error('Error adding expense:', error);
      alert('Error adding expense');
    });
  }
    setMoneySpent('');
    setDescription('');
    setSelectedCategory('');
  };

    const fetchExpenses = () => {
      fetch(
        `https://expense-tracker-25433-default-rtdb.firebaseio.com/userExpenses${userEmail}.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
.then((response) => {
          if (response.ok) {
           response.json().then((data) => {
            console.log(data);
            let arr = [];
            for (let key in data) {
              arr.push({
                id:key,
                description: data[key].description,
                amount: data[key].amount,
                category: data[key].category,
              });
            }
            setExpenses(arr);
          })
          } else {
            response.json().then((data) => {
              let errorMessage = "Add Expense Failed!!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            });
          }
        }).catch((err) => {
          console.log(err);
        });
    };

    useEffect(()=>{
    fetchExpenses();
  },[])

  const editHandler =(id)=>{
    let editExpense = expenses.filter((expense) => {
      return expense.id === id;
    });
    setEdit(true);
    setExpenseId(id);
    setMoneySpent(editExpense[0].amount);
    setDescription(editExpense[0].description);
    setSelectedCategory(editExpense[0].category);
    console.log(editExpense);
  };
  

  const deleteHandler=(id)=>{
    fetch(`https://expense-tracker-25433-default-rtdb.firebaseio.com/userExpenses${userEmail}/${id}.json`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((response) => {
      console.log(response);
      setExpenses((expense)=> expense.filter((item)=>item.id!==id));
    }).catch((err) => {
      alert("Expense not deleted!! "+ err);
    });
  }

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
        <button  className={styles.submitBtn} type="submit">Add Expense</button>
      </form>
      <ExpenseList expenses={expenses} editHandler={editHandler} deleteHandler={deleteHandler} />
    </div>
  );
};

export default Expenses;
