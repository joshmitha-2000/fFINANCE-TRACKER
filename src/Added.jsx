import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Added() {
  const [transactions, setTransactions] = useState([]);
  const [data, setData] = useState([]);

  // Fetch transactions from localStorage
  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      const parsedTransactions = JSON.parse(storedTransactions);
      setTransactions(parsedTransactions);

      // Process expenses for the pie chart
      const expenseCategories = {};
      // An empty object that will be used to accumulate total expenses for each category.

      // Accumulate total expenses per category
      parsedTransactions.forEach((transaction) => {
        if (transaction.Category === 'expense') {
          const category = transaction.expense;
          const amount = Number(transaction.Amount);
          if (expenseCategories[category]) {
            expenseCategories[category] += amount;
          } else {
            expenseCategories[category] = amount;
          }
        }
      });

      // Format the data for the PieChart
      const pieData = Object.keys(expenseCategories).map((key) => ({
        name: key,
        value: expenseCategories[key],
      }));

      setData(pieData);
    }
  }, []);

  function btn(id) {
    const filteredTransactions = transactions.filter((trans) => trans.id !== id);
    setTransactions(filteredTransactions);
    localStorage.setItem('transactions', JSON.stringify(filteredTransactions)); // Update localStorage
  }
  
  // Define colors for pie chart slices
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Function to customize the pie chart labels
  const renderCustomizedLabel = ({ name, value }) => {
    return `${name}: ${value}`;
  };

  return (
    <div style={{ display: 'flex' ,gap:'20px',justifyContent:"space-between"}} className='added'>
      {/* Transactions Table */}
      <div style={{ flex: 1}}>
      <h2 style={{color:'black', marginLeft:'40px'}}>History</h2>
        <table className='table'>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Expense Category</th>
              <th>Date</th>
              <th>x</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}
                style={{
                  backgroundColor:
                    transaction.Category === 'income' ? '#d4edda' : '#f8d7da',
                }}>
                <td>{transaction.Amount}</td>
                <td>
                  {transaction.Category === 'income'
                    ? 'Income'
                    : transaction.expense}
                </td>
                <td>{transaction.date}</td>
                <button style={{background:'#f4f4f9',color:'black', border:'none',borderCollapse:'collapse'}}onClick={()=>(btn(transaction.id))} >x</button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pie Chart */}
    
      <div  style={{ flex: 1 }}>
      <h2 style={{color:'black',marginLeft:'30PX'}}>All Expenses</h2>
        
        <ResponsiveContainer id="pie"  width="100%" height={500}>
          <PieChart>
            <Pie
              data={data} // This prop provides the data to be visualized in the pie chart, where data is an array of objects.
              cx="50%" // Center the chart horizontally
              cy="40%" // Center the chart vertically
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}




















// recharts: A chart library that you are using to create a pie chart. You import specific components (PieChart, Pie, Cell, Tooltip, Legend, and ResponsiveContainer) that you'll use to build the chart.
// Explanation

    // Loop Through Transactions:
    //     parsedTransactions.forEach((transaction) => {...})
    //     This line goes through each transaction in the parsedTransactions array.

    // Check for Expenses:
    //     if (transaction.Category === 'expense') {...}
    //     Only process transactions that are marked as expenses.

    // Get Expense Category:
    //     const category = transaction.expense;
    //     Store the category of the expense (like "food" or "rent") in a variable named category.

    // Convert Amount to Number:
    //     const amount = Number(transaction.Amount);
    //     Convert the Amount from a string (e.g., "50") to a number (e.g., 50).

    // Accumulate Expenses:
    //     if (expenseCategories[category]) {...}
    //         Check if the expenseCategories object already has an entry for this category.
    //     If It Exists:
    //         expenseCategories[category] += amount;
    //         Add the amount to the existing total for that category.
    //     If It Doesn’t Exist:
    //         expenseCategories[category] = amount;
    //         Create a new entry for the category and set its value to the current amount.

//     Dry Run Steps

//     Initialize expenseCategories:

//     javascript

// const expenseCategories = {}; // Start with an empty object: {}

// Iterate Over parsedTransactions:

//     Use forEach to loop through each transaction.

// First Iteration:

//     Current transaction: { Amount: '50', Category: 'expense', expense: 'food' }
//     Check if the category is expense:
//         Yes, it is an expense.
//     Get the category and amount:

//     javascript

// const category = transaction.expense; // category = 'food'
// const amount = Number(transaction.Amount); // amount = Number('50') => 50

// Check if expenseCategories already has food:

//     No, it does not exist.

// Add the category and amount:

// javascript

//         expenseCategories[category] = amount; // expenseCategories = { food: 50 }

// Final Result

// After processing this single transaction, the final expenseCategories object will look like this:

// javascript

// {
//   food: 50
// }

// Summary

//     Input Transaction: { Amount: '50', Category: 'expense', expense: 'food' }
//     Final Output: { food: 50 }
//     This shows that we have accumulated a total of $50 in the food category from this transaction.

// Tooltip:

//     <Tooltip />: This component enables tooltips on the pie chart. When a user hovers over a slice, a tooltip will display additional information about that slice.

// Legend:

//     <Legend />: This component displays a legend for the pie chart, allowing users to see what each color represents without needing to hover over the slices.