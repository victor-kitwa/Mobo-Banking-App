const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML file at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// POST endpoint for handling balance requests
app.post('/balance', (req, res) => {
  const { transaction_reference, transaction_code, amount, narration, phone_number } = req.body;

  // Server-side validation
  if (!transaction_reference || !transaction_code || !amount || !narration || !phone_number) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const response = {
    transaction_reference,
    transaction_code,
    amount, // Use the provided amount
    account_name: "John Doe",
    phone_number,
    actual_balance: 500,
    available_balance: 500
  };
  res.json(response);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Mock application listening on port ${PORT}`);
});
