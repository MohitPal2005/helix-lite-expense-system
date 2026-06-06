import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const COLORS = ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'];

export default function Dashboard() {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/expenses`)
      .then(res => res.json())
      .then(data => {
        setExpenses(data);
        setLoading(false);
      })
      .catch(err => console.error("Could not load expenses", err));
  }, []);

  // Calculate Real Data Metrics
  const totalSpend = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const pendingCount = expenses.filter(exp => exp.status === 'Draft' || exp.status === 'Submitted').length;
  const approvedValue = expenses.filter(exp => exp.status === 'Approved').reduce((sum, exp) => sum + exp.amount, 0);

  // Group data by category for charts
  const categoryData = expenses.reduce((acc, exp) => {
    const existing = acc.find(item => item.name === exp.category);
    if (existing) {
      existing.amount += exp.amount;
    } else {
      acc.push({ name: exp.category, amount: exp.amount });
    }
    return acc;
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading your data...</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Real User Greeting */}
      <div className="mb-6">
        {user ? (
          <>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name.split(' ')[0]}.</h1>
            <p className="text-gray-500 mt-1">Here is a real-time overview of your company's expenses.</p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-900">General Overview (Demo Mode)</h1>
            <p className="text-gray-500 mt-1">Please Sign In to view your actual company data.</p>
          </>
        )}
      </div>

      {/* Floating Data Widgets (Real Data) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-50 rounded-xl text-blue-600"><TrendingUp className="w-6 h-6"/></div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Pipeline Value</p>
              <h3 className="text-2xl font-bold text-gray-900">₹{totalSpend.toLocaleString()}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-amber-50 rounded-xl text-amber-500"><Clock className="w-6 h-6"/></div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Actions</p>
              <h3 className="text-2xl font-bold text-gray-900">{pendingCount} Claims</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-green-50 rounded-xl text-green-500"><CheckCircle className="w-6 h-6"/></div>
            <div>
              <p className="text-sm font-medium text-gray-500">Approved Value</p>
              <h3 className="text-2xl font-bold text-gray-900">₹{approvedValue.toLocaleString()}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section (Real Data) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Spend by Category</h3>
          <div className="h-64">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="amount" fill="#2563EB" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">No expense data yet.</div>
            )}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2 self-start">Expense Distribution</h3>
          <div className="h-64 w-full">
             {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="amount">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">No expense data yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}