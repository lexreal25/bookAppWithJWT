const express = require("express");
const router = express.Router();

//import models
const Authors = require("../models/authorModel");
const {
  listAuthorController,
  createAuthorController,
  updateAuthorController,
} = require("../controller/authorController");

router.get("/authors", listAuthorController);

router.post("/author", createAuthorController);

router.patch("/author", updateAuthorController);

module.exports = router;
