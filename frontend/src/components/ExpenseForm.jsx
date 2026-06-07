import { useState, useRef } from 'react';
import { Mic, Disc3, UploadCloud, FileText, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ExpenseForm({ onExpenseAdded }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    date: '',
    category: 'Travel',
    amount: '',
    description: ''
  });
  const [aiText, setAiText] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const recognitionRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => setFile(null);

  const toggleListening = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Your browser does not support voice input. Please use Chrome or Edge.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.continuous = false; 
    recognition.interimResults = false; 
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
      setAiText(''); 
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAiText(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      if (event.error !== 'no-speech') {
        setError(`Microphone error: ${event.error}.`);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleAiFill = async () => {
    if (!aiText) return;
    
    setIsAiLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/smart-capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: aiText })
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({
          date: data.date || '',
          category: data.category || 'Travel',
          amount: data.amount || '',
          description: data.description || ''
        });
        setAiText(''); 
      } else {
        setError('AI could not understand the text. Please fill manually.');
      }
    } catch (err) {
      setError('Server error during AI processing.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (parseFloat(formData.amount) <= 0) {
      setError('Amount must be greater than zero.');
      return;
    }

    setLoading(true);

    try {
      if (user) {
        // --- LOGGED IN USER: Save to Database ---
        const payload = { ...formData, user_id: user.email }; // Attach the user identity
        const response = await fetch(`${import.meta.env.VITE_API_URL}/expenses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const newExpense = await response.json();
          if (onExpenseAdded) onExpenseAdded(newExpense);
          setFormData({ date: '', category: 'Travel', amount: '', description: '' });
          setFile(null); 
        } else {
          setError('Failed to submit expense to server.');
        }
      } else {
        // --- GUEST USER: Save to LocalStorage ---
        const guestExpenses = JSON.parse(localStorage.getItem('guest_expenses') || '[]');
        const newExpense = {
          ...formData,
          amount: parseFloat(formData.amount),
          id: Date.now(), // Generate a fake ID
          status: 'Draft',
          created_at: new Date().toISOString()
        };
        guestExpenses.push(newExpense);
        localStorage.setItem('guest_expenses', JSON.stringify(guestExpenses));
        
        if (onExpenseAdded) onExpenseAdded(newExpense);
        setFormData({ date: '', category: 'Travel', amount: '', description: '' });
        setFile(null); 
      }
    } catch (err) {
      setError('An error occurred while saving the expense.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      
      {/* AI Smart Capture Section */}
      <div className="mb-6 p-5 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100 shadow-inner">
        <label className="block text-sm font-bold text-purple-900 mb-3 flex items-center gap-2">
          ✨ Intelligent Voice Capture
        </label>
        
        <div className="flex gap-3 items-center">
          <button 
            type="button"
            onClick={toggleListening}
            className={`flex items-center justify-center h-12 w-12 rounded-full text-white transition-all duration-300 shadow-md flex-shrink-0 ${
              isListening 
                ? 'bg-red-500 animate-pulse ring-4 ring-red-200' 
                : 'bg-purple-600 hover:bg-purple-700 hover:scale-105'
            }`}
            title={isListening ? "Click to stop recording" : "Click to speak"}
          >
            {isListening ? <Disc3 className="w-5 h-5 animate-spin" /> : <Mic className="w-5 h-5" />}
          </button>

          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder={isListening ? "Listening... speak now" : "Click the mic or type here..."}
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                isListening 
                  ? 'border-red-300 bg-red-50 focus:ring-red-300 text-red-900 placeholder-red-400' 
                  : 'border-purple-200 bg-white focus:ring-purple-400 text-gray-800'
              }`}
              value={aiText}
              onChange={(e) => setAiText(e.target.value)}
              disabled={isListening}
            />
          </div>

          <button 
            type="button"
            onClick={handleAiFill}
            disabled={isAiLoading || !aiText || isListening}
            className="h-12 bg-gray-900 text-white px-6 rounded-lg text-sm font-semibold hover:bg-black transition disabled:opacity-50 whitespace-nowrap shadow-md"
          >
            {isAiLoading ? 'Analyzing...' : 'Auto-Fill'}
          </button>
        </div>
      </div>

      <hr className="my-8 border-gray-100" />

      <h2 className="text-xl font-semibold mb-5 text-gray-800">Submit Claim</h2>
      {error && <p className="text-red-500 mb-4 text-sm font-medium bg-red-50 p-3 rounded border border-red-200">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <input type="date" required
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
          />
          <select 
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            <option value="Travel">Travel</option>
            <option value="Materials">Materials</option>
            <option value="Training">Training</option>
            <option value="Consulting">Consulting</option>
          </select>
          <input type="number" step="0.01" required placeholder="Amount (₹)"
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
          />
        </div>
        <input type="text" placeholder="Description" required
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />

        <div className="pt-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Receipt (Optional)</label>
          <div 
            className={`relative w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {!file ? (
              <>
                <UploadCloud className={`w-8 h-8 mb-2 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`} />
                <p className="text-sm font-medium text-gray-700 mb-1">Drag and drop your receipt here</p>
                <p className="text-xs text-gray-500">or click to browse</p>
              </>
            ) : (
              <div className="flex items-center gap-4 bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm w-full relative z-10">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold text-gray-800 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button 
                  type="button" 
                  onClick={removeFile}
                  className="p-1.5 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Processing...' : 'Submit Expense'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/app/review')}
            className="flex-1 flex justify-center py-3 px-4 border border-blue-200 rounded-xl shadow-sm text-sm font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Go to Review Queue
          </button>
        </div>
      </form>
    </div>
  );
}