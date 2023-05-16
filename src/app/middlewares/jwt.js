import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
  const token = jwt.sign({ userId },process.env.SECRET, { expiresIn: '1h' });
  return token;
};

export default generateToken;