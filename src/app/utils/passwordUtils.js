import bcrypt from 'bcrypt';

// Function to generate a hashed password
const generateHashedPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error generating hashed password');
  }
};


const passCompare = async (provided, saved) => {
    const check = await bcrypt.compare(provided, saved);
    return check;
  };

  export { passCompare,generateHashedPassword};
  
// Function to compare a password with a hashed password
// export const comparePassword = async (password, hashedPassword) => {
//   try {
    
//     const isMatch = await bcrypt.compare(password, hashedPassword);
//     console.log(password,"password");
//     console.log(hashedPassword,"hashed one")
//     console.log(isMatch,"is match")
//     return isMatch;
//   } catch (error) {
//     throw new Error('Error comparing passwords');
//   }
// };
