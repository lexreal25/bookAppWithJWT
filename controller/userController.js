const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const salt = 10;
const jwt = require('jsonwebtoken');



const createUser = (req, res) => {
  //check for error
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(error);
  }

  const { email, password, username } = req.body;
  bcrypt
    .hash(password, bcrypt.genSalt(salt))
    .then((hashedPassword) => {
      //create new user with the hashed password
      const user = new UserModel({
        email,
        password: hashedPassword,
        username,
      });
      user
        .save()
        .then((user) => {
          res.json({
            message: `user ${user.username} created successfully`,
            data: { username: user.username, email: user.email },
          });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

const listUsers = async (req, res) => {
  try {
    await UserModel.find({}).then((list) => {
      res.json({ data: list });
    });
  } catch (error) {
    console.log(error);
  }
};

//signin
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.json({ message: "user not found" });

    //if user is found compare password with password
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      return res.json({ message: "email and password combination incorrect" });

      const token = jwt.sign({username: user.username, email: user.email, userId: user._id},
          'secretekeyundecodable', {expiresIn: '5d'}
        )
    return res.json({ message: "user signed in", token });

  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  listUsers,
  signin,
};
