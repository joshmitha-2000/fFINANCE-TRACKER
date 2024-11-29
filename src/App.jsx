import React from 'react';
import Finance from './finance tracker';
import Added from './Added.jsx';
import Balance from './Balance.jsx';
import { BrowserRouter , Route, Routes, Link } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <div>
      
        <nav>
          <h3 >Finance Tracker</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
            <Link to="Added/">Expenses</Link>
             </li>
             <li>
             <Link to="Balance/">balance</Link>
             </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Finance />} />
          <Route path="Added/" element={<Added />} />
          <Route path="Balance/" element={<Balance />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;