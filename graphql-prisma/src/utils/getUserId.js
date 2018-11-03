import jwt from "jsonwebtoken";
const getUserId = request => {
  const header = request.request.headers.authorization;
  if (!header) {
    throw new Error("Authentication Required");
  }
  const token = header.replace("Bearer ", "");
  const decoded = jwt.verify(token, "thisissupersecrettoo");
  return decoded.userId;
};
export default getUserId;
