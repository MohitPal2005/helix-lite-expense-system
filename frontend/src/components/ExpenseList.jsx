import { useAuth } from '../context/AuthContext'; 

export default function ExpenseList({ expenses, onStatusChange }) {
  const { user } = useAuth(); 

  const handleUpdate = async (id, newStatus) => {
    if (user) {
      
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/expenses/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
        if (response.ok) {
          onStatusChange(id, newStatus);
        }
      } catch (err) {
        console.error("Failed to update status");
      }
    } else {
      
      const guestExpenses = JSON.parse(localStorage.getItem('guest_expenses') || '[]');
      const updatedExpenses = guestExpenses.map(exp => 
        exp.id === id ? { ...exp, status: newStatus } : exp
      );
      localStorage.setItem('guest_expenses', JSON.stringify(updatedExpenses));
      onStatusChange(id, newStatus);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Submitted': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-sm font-semibold text-gray-600">Date</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Category</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Description</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Amount</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr><td colSpan="6" className="p-4 text-center text-gray-500">No expenses found.</td></tr>
          ) : (
            expenses.map(exp => (
              <tr key={exp.id} className="border-b hover:bg-gray-50">
                <td className="p-4 text-sm">{exp.date}</td>
                <td className="p-4 text-sm font-medium">{exp.category}</td>
                <td className="p-4 text-sm text-gray-600">{exp.description}</td>
                <td className="p-4 text-sm font-bold">₹{Number(exp.amount).toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(exp.status)}`}>
                    {exp.status}
                  </span>
                </td>
                <td className="p-4">
                  <select 
                    className="border text-sm p-1 rounded"
                    value={exp.status}
                    onChange={(e) => handleUpdate(exp.id, e.target.value)}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}