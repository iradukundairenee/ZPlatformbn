import mongoose from 'mongoose';
import User from './user.js';
import dbConfig from '../config/database-config.js';

mongoose.connect(dbConfig.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const models = {
  User,
};

export default models;
