import express from 'express';
import routes from './app/routes/index.js';
import config from './app/config/database-config.js';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());
app.use('/api/', routes);

const PORT = process.env.PORT || 5000;

// Establish a MongoDB connection
mongoose.connect(config.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`App running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
