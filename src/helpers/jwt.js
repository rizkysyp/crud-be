const jwt = require("jsonwebtoken");

const generateToken = async (email, id) => {
  const payload = {
    email,
    id,
    type: "access-token",
  };
  const options = {
    algorithm: "HS256",
    expiresIn: "1d",
  };
  const result = await jwt.sign(payload, process.env.SECRET_KEY, options);
  return result;
};

const generateRefreshToken = (payload) => {
  const verifyOpts = {
    expiresIn: "24h",
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, verifyOpts);
  return token;
};
const verify = async (token) => {
  const result = await jwt.verify(token, process.env.SECRET_KEY);
  return result;
};

module.exports = {
  generateRefreshToken,
  generateToken,
  verify,
};
