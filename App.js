const { useState, useEffect } = React;

const App = () => {
  const [expenses, setExpenses] = useState([]);  // List of expenses
  const [name, setName] = useState('');         // Input for expense name
  const [amount, setAmount] = useState('');     // Input for amount

  // Load data when page opens
  useEffect(() => {
    const saved = localStorage.getItem('expenses');
    if (saved) {
      setExpenses(JSON.parse(saved));
    }
  }, []);

  // Save data automatically
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Add new expense - SIMPLE LOGIC
  const addExpense = () => {
    if (name && amount) {
      // Create new expense object
      const newExpense = {
        id: Date.now(),           // Unique ID
        name: name,               // What we spent on
        amount: Number(amount),   // Convert to number
        date: new Date().toLocaleDateString()  // Today's date
      };
      
      // Add to beginning of list
      setExpenses([newExpense, ...expenses]);
      
      // Clear inputs
      setName('');
      setAmount('');
    }
  };

  // Delete expense - SIMPLE FILTER
  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  // Calculate total - ONE LINE
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1>My Expense Tracker</h1>
        <div>Total: ₹{total}</div>
      </div>

      {/* Add Expense Form - SIMPLE INPUTS */}
      <div className="form">
        <input 
          placeholder="What? (Food, Taxi...)" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="number" 
          placeholder="Amount" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addExpense}>Add</button>
      </div>

      {/* Show expenses or empty message */}
      <div className="list">
        {expenses.length === 0 ? (
          <p>No expenses added yet!</p>
        ) : (
          expenses.map(expense => (
            <div key={expense.id} className="expense">
              <div>
                <strong>{expense.name}</strong> - ₹{expense.amount}
                <small>{expense.date}</small>
              </div>
              <button onClick={() => deleteExpense(expense.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
