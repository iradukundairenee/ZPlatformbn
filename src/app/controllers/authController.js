import models from '../models/index.js';
import generateToken from '../middlewares/tokenMiddleware.js';
import sendResponse from '../utils/response.js';
import { generateHashedPassword ,comparePassword} from '../utils/passwordUtils.js';



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
  
      // Return success message
      sendResponse(res, 201, 'Signup successful', {user:newUser, token });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        sendResponse(res, 401, 'Invalid username or password');
        return;
      }
  
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        sendResponse(res, 401, 'Invalid username or password');
        return;
      }
  
      user.login();
      const token = generateToken(user._id);
      sendResponse(res, 200, 'Login successful', { user, token });
    } catch (error) {
      console.error('Error during login:', error);
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
