import { useState, useEffect } from 'react';
import ExpenseList from '../components/ExpenseList';
import { CheckSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; 

export default function ReviewQueue() {
  const { user } = useAuth(); 
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (user) {
      
      fetch(`${import.meta.env.VITE_API_URL}/expenses?user_id=${user.email}`)
        .then(res => res.json())
        .then(data => setExpenses(Array.isArray(data) ? data : []))
        .catch(err => console.error("Could not load expenses", err));
    } else {
      
      const guestData = JSON.parse(localStorage.getItem('guest_expenses') || '[]');
      setExpenses(guestData);
    }
  }, [user]);

  const handleStatusChange = (id, newStatus) => {
    setExpenses(expenses.map(exp => 
      exp.id === id ? { ...exp, status: newStatus } : exp
    ));
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <CheckSquare className="w-8 h-8 text-blue-600" />
          Review Queue
        </h1>
        <p className="text-gray-600 mt-2">Manage and approve employee reimbursement claims.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <ExpenseList expenses={expenses} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
}