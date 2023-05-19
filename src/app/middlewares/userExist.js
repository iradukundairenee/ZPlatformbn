import models from '../models/index.js';

const { User } = models;

const checkUserExists = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if a user with the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // User does not exist, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error checking user existence:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default checkUserExists;
