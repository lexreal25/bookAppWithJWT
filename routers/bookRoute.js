const express = require("express");
const router = express.Router();
const { body } = require('express-validator');

//import models
const {
  listBookController,
  createBookController,
  deleteBookController,
  updateBookController,
} = require("../controller/bookControllers");
const isAuth = require("../middleware/is-Auth");

//title gist yop publ
//dispplay created books
router.get("/books", listBookController);

//create book
router.post("/book", isAuth,
  [
    body('author').trim().not().isEmpty().withMessage('provide authors name'),
    body('title').trim().not().isEmpty().withMessage('provide title'),
    body('gist').trim().not().isEmpty().withMessage('provide summary of the book'),
    body('YOP').trim().not().isEmpty().withMessage('provide the year of publication'),
    body('publisher').trim().not().isEmpty().withMessage('add the pubisher')
  ]
,createBookController);

router.delete("/book", deleteBookController);

//update existing book
router.patch("/book", updateBookController);

module.exports = router;
