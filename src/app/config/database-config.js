import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  uri: process.env.DB_URI,
};

export default  dbConfig;
