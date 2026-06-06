import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Expense
from datetime import datetime
from google import genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expenses.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Initialize the new GenAI client
# It automatically picks up GEMINI_API_KEY from your .env file
ai_client = genai.Client()

with app.app_context():
    db.create_all()

@app.route('/api/smart-capture', methods=['POST'])
def smart_capture():
    data = request.json
    text = data.get('text', '')
    
    if not text:
        return jsonify({"error": "No text provided"}), 400

    prompt = f"""
    You are an AI assistant for an expense management system. 
    Extract the expense details from the following text and return ONLY a raw JSON object. Do not include markdown formatting.
    
    Text: "{text}"
    
    Required JSON keys:
    - "date": Use format YYYY-MM-DD. If not mentioned, use today's date ({datetime.today().strftime('%Y-%m-%d')}).
    - "category": Must be exactly one of: "Travel", "Materials", "Training", "Consulting". Guess the best fit.
    - "amount": The numeric value only (e.g., 1500).
    - "description": A short, clean summary of the expense.
    """
    
    try:
        # Use the new SDK syntax and a modern fast model
        response = ai_client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        
        # Clean the response to ensure it's valid JSON
        cleaned_response = response.text.replace('```json', '').replace('```', '').strip()
        extracted_data = json.loads(cleaned_response)
        
        return jsonify(extracted_data), 200
    except Exception as e:
        print("Gemini Error:", e)
        return jsonify({"error": "Failed to parse text with AI"}), 500

# --- Standard CRUD Routes ---
@app.route('/expenses', methods=['POST'])
def create_expense():
    data = request.json
    if not all(k in data for k in ("date", "category", "amount")):
        return jsonify({"error": "Missing mandatory fields"}), 400
    try:
        amount = float(data['amount'])
        if amount <= 0:
            return jsonify({"error": "Amount must be greater than zero"}), 400
    except ValueError:
        return jsonify({"error": "Amount must be numeric"}), 400

    new_expense = Expense(
        date=data['date'],
        category=data['category'],
        amount=amount,
        description=data.get('description', ''),
        status=data.get('status', 'Draft')
    )
    db.session.add(new_expense)
    db.session.commit()
    return jsonify(new_expense.to_dict()), 201

@app.route('/expenses', methods=['GET'])
def get_expenses():
    expenses = Expense.query.order_by(Expense.created_at.desc()).all()
    return jsonify([expense.to_dict() for expense in expenses]), 200

@app.route('/expenses/<int:id>', methods=['PATCH'])
def update_expense_status(id):
    expense = db.session.get(Expense, id)
    if not expense:
        return jsonify({"error": "Expense not found"}), 404
    data = request.json
    if 'status' in data:
        if data['status'] not in ['Draft', 'Submitted', 'Approved', 'Rejected']:
            return jsonify({"error": "Invalid status"}), 400
        expense.status = data['status']
        db.session.commit()
        return jsonify(expense.to_dict()), 200
    return jsonify({"error": "No status provided"}), 400

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)