import jwt from "jsonwebtoken";
export const generateToken = id => {
  return jwt.sign({ userId: id }, process.env.jwtSecret, {
    expiresIn: "7 days"
  });
};
