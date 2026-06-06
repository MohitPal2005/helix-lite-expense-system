import ExpenseForm from '../components/ExpenseForm';
import { FileText } from 'lucide-react';

export default function SubmitClaim() {
  // Since the form handles the POST request to Flask internally, 
  // we just need a simple success handler here for the UI.
  const handleSuccess = () => {
    alert("Expense submitted successfully! It is now in the Review Queue.");
  };

  return (
    <div className="max-w-4xl animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <FileText className="w-8 h-8 text-blue-600" />
          Submit New Claim
        </h1>
        <p className="text-gray-600 mt-2">Use the AI Voice Capture or fill the form manually.</p>
      </div>

      {/* Your existing flawless form goes here */}
      <ExpenseForm onExpenseAdded={handleSuccess} />
    </div>
  );
}