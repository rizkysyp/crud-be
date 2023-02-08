const { response } = require("../middlewares/response");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { generateToken, generateRefreshToken } = require("../helpers/jwt");
const ModelUsers = require("../model/user");

const userController = {
  register: async (req, res) => {
    let {
      rows: [users],
    } = await ModelUsers.checkEmail(req.body.email);
    if (users) {
      return response(res, 403, false, [], "EMAIL ALREADY BEEN REGISTERED");
    }
    ////CREATE DATA
    let password = bcrypt.hashSync(req.body.password);
    let data = {
      id: uuidv4(),
      email: req.body.email,
      password,
      username: req.body.username,
    };

    try {
      const result = await ModelUsers.createUsers(data);
      if (result) {
        console.log(result);
        response(res, 200, true, [], "register success,Please Login");
      }
    } catch (err) {
      response(res, 404, false, err, " register fail");
    }
  },
  login: async (req, res) => {
    try {
      const email = req.body.email;
      console.log(email, "email");
      let {
        rows: [users],
      } = await ModelUsers.checkEmail(email);
      if (!users) {
        return response(res, 404, false, null, "email not found");
      }

      const password = req.body.password;
      const validation = bcrypt.compareSync(password, users.password);
      if (!validation) {
        return response(res, 404, false, null, "wrong password");
      }
      let payload = {
        id: users.id,
        fullname: users.fullname,
        email: users.email,
      };
      let accessToken = generateToken(payload);
      let refToken = generateRefreshToken(payload);

      users.token = accessToken;
      users.refreshToken = refToken;

      response(res, 200, true, users, "LOGIN SUCCESS");
    } catch (err) {
      return response(res, 404, false, err, "LOGIN FAILED");
    }
  },
};

exports.userController = userController;
