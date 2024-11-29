import React, { useEffect, useState } from 'react';
import './App.css'


export default function Finance() {
    const [transactions, setTransactions] = useState([]);
    const [transaction, setTransaction] = useState({
        Amount: '',
        Category: '',
        date: '',
        expense: '',
    });

    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [currentBalance, setCurrentBalance] = useState(0);
    const budgetLimit = 100000; 

    useEffect(() => {
        const storedTransactions = localStorage.getItem('transactions');
        if (storedTransactions) {
            const parsedTransactions = JSON.parse(storedTransactions);
            setTransactions(parsedTransactions);
            // setTransactions(JSON.parse(storedTransactions))

            // Calculate initial balances
            const income = parsedTransactions.reduce((acc, trans) => {
                return trans.Category === 'income' ? acc + parseFloat(trans.Amount) : acc;
            }, 0);
            const expense = parsedTransactions.reduce((acc, trans) => {
                return trans.Category === 'expense' ? acc + parseFloat(trans.Amount) : acc;
            }, 0);
            setTotalIncome(income);
            setTotalExpense(expense);
            setCurrentBalance(income - expense);

            // Check for overspending on initial load
            if (expense > budgetLimit) {
                alert("Warning: You have overspent your budget!");
            }
        }
    }, []);

    const update = (e) => {
        e.preventDefault();
        
        const amount = parseFloat(transaction.Amount);
        
        if (isNaN(amount) || amount <= 0 || !transaction.Category) {
            alert("Please enter a valid amount and select a category");
            return;
        }

        const newTransaction = { ...transaction, id: Date.now() }; 
        const updatedTransactions = [...transactions, newTransaction];
        setTransactions(updatedTransactions);

        // Update balances
        if (transaction.Category === 'income') {
            setTotalIncome(prevIncome => prevIncome + amount);
            setCurrentBalance(prevBalance => prevBalance + amount);
        } else if (transaction.Category === 'expense') {
            setTotalExpense(prevExpense => prevExpense + amount);
            setCurrentBalance(prevBalance => prevBalance - amount);

            // Check for overspending after updating total expense
            if (totalExpense + amount > budgetLimit) {
                alert("Warning: You have overspent your budget!");
            }
        }

        // Store transactions in local storage
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

        // Reset form
        setTransaction({
            Amount: '',
            Category: '',
            date: '',
            expense: '',
        });
    };

    return (
        <div className="container">
            <div className="balance">
                <span>
                    <h3 id="income">Income</h3>
                    <p >${totalIncome.toFixed(2)}</p>
                </span>
                <span>
                    <h3>Expense</h3>
                    <p style={{ color: 'red' }}>${totalExpense.toFixed(2)}</p>
                </span>
                <span>
                    <h3>Current Balance</h3>
                    <p>${currentBalance.toFixed(2)}</p>
                </span>
            </div>

            <div>
                <h1 style={{ textAlign: 'center' }}>New Transaction</h1>
                <form onSubmit={update}>
                    <label htmlFor="amount">Amount:</label>
                    <input
                        type="number"
                        name="Amount"
                        placeholder="Enter amount"
                        value={transaction.Amount}
                        onChange={(e) => setTransaction({...transaction,Amount: e.target.value})}
                    /><br /><br />

                    <label htmlFor="category">Category:</label>
                    <select
                        name="Category"
                        id="category"
                        value={transaction.Category}
                        onChange={(e) => setTransaction({...transaction,Category: e.target.value,expense: '',})}>
                        <option value="">Select category</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select><br /><br />
                    
                    {transaction.Category === 'expense' && (
                        <>
                            <label htmlFor="expense">Expense Category:</label>
                            <select
                                name="Expense Category"
                                id="expense"
                                value={transaction.expense}
                                onChange={(e) => setTransaction({...transaction,expense: e.target.value})}>
                                <option value="">Select category</option>
                                <option value="food">Food</option>
                                <option value="rent">Rent</option>
                                <option value="entertainment">Entertainment</option>
                                <option value="others">Others</option>
                            </select><br /><br />
                        </>
                    )}
                    
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={transaction.date}
                        onChange={(e) => setTransaction({...transaction,date: e.target.value})}/><br /><br />
                    
                    <button type="submit">Add Transaction</button>
                </form>
            </div>
        </div>
    );
}
