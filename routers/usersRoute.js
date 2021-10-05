const express = require("express");
const { createUser, listUsers, signin } = require("../controller/userController");
const router = express.Router();
//express validator
const { body, check, validationResult } = require("express-validator");
const UserModel = require("../models/UserModel");

// router.post(
//   "/users",
//   [
//     body("username")
//       .trim()
//       .not()
//       .isEmpty()
//       .withMessage("username cannot be empty"),
//     body("email")
//       .isEmail().withMessage("email incorrect")
//       .custom((value, { req }) => {
//         //check if email exists
//         return UserModel.findOne({ email: value }).then((result) => {
//           if (result) return Promise.reject("email taken");
//         });
//       }),
//     body("password")
//       .trim()
//       .isLength({ min: 5 })
//       .withMessage("password too short"),
//   ],
//   createUser
// );

//create user 
router.post("/users", async (req, res, next) =>{
  await check("email").isEmail().run(req);
  await check("password").isLength({ min: 5}).run(req);

  const result= validationResult(req)
  if (!result.isEmpty()) {
    return res.status(400).json({erros: result.array()})
  }
},
createUser);
router.get("/users", listUsers);

router.put("/signin",signin);

module.exports = router;