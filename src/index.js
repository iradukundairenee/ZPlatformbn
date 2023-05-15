// Import required modules
import express from 'express';

// Create an instance of Express app
const app = express();

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`App running on port ${PORT}`));

