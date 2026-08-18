import bcrypt from "bcrypt";

// HASH PASSWORD FUNCTION
export const hashPassword = async (password, saltRounds = 10) => {
  return bcrypt.hash(password, saltRounds);
};

// PASSWORD COMPARE FUNCTION AGAINST THE PROVIDED PASSWORD
export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};
