import models from '../models/index.js';
import generateToken from '../middlewares/jwt.js';
import sendResponse from '../utils/response.js';
import { generateHashedPassword ,passCompare} from '../utils/passwordUtils.js';
import sendEmail  from '../utils/emailUtils.js';



const { User } = models;

const controller = {
  signup: async (req, res) => {
    try {
      if (!req.body) {
        throw new Error('Missing required fields');
      }
  
      // Extract the password from the request body
      const { password } = req.body;
      // Generate a hashed password
      const hashedPassword = await generateHashedPassword(password);
      // Create a new user with the hashed password
      const newUser = new User({ ...req.body, password: hashedPassword });
  
      await newUser.save();
  
      // Generate token
      const token = generateToken(newUser._id);

    // Send email
    // const emailSubject = 'Signup successful';
    // const emailMessage = 'Thank you for signing up!';

    // sendEmail(emailSubject, emailMessage);
  
      // Return success message
      sendResponse(res, 201, 'Signup successful', {user:newUser, token });
    } catch (error) {
      console.error('Error during signup:', error);
      sendResponse(res, 500, 'Internal server error', error);
    }
  },

  login: async (req, res) => {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) throw new Error('Invalid email or password');

      const pass = await passCompare(req.body.password, user.password);
      if (!pass) throw new Error('Invalid email or password');

      user = { ...user.toObject(), password: undefined };

      // Generate token
      const token = generateToken(user._id);

      sendResponse(res, 200, 'login successful', {token});
    } catch (err) {
      return res.status(400).json({ status: 'error', message: err.message });
    }
  },
  

  getAllUsers: async (req, res) => {
    try {
      // Fetch all users from the database
      const users = await User.find();
  
      // Return the users as the response
      sendResponse(res, 200, 'Users retrieved successfully', { users });
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  
  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find the user by their ID
      const user = await User.findById(userId);
  
      // If the user is not found, return an error
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Delete the user from the database
      await user.deleteOne();
  
      // Return success message
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  
  getUser: async (req, res) => {
    try {
      const { userId } = req.params;

      // Find the user by their ID
      const user = await User.findById(userId);

      // If the user is not found, return an error
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Return the user as the response
      sendResponse(res, 200, 'User retrieved successfully', { user });
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  logout: async (req, res) => {
    try {
      const user = req.user;
      if (!user) {
        res.status(401).json({ error: 'Not logged in' });
        return;
      }
      // Logout the user
      user.logout();
      // Redirect the user to the home page
      res.redirect('/');
    } catch (error) {
      console.error('Error during logout:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default controller;
