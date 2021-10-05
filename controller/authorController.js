//account model
const AuthorModel = require("../models/authorModel");

//ACCOUNT CREATION CONTROLLERS
const listAuthorController = (req, res) => {
  AuthorModel.find()
    .populate("bookId")
    .then((author) => {
      res.json({ data: author });
    })
    .catch((err) => console.log(err));
};

//create author
const createAuthorController = (req, res) => {
  const { name, gender, age, country, dateCreated, authorId } = req.body;
  //create instance of the author model
  const author = new AuthorModel({
    name,
    gender,
    age,
    country,
    dateCreated,
    authorId,
  });
  author
    .save()
    .then((author) => {
      res.json({ message: "author created", data: author });
    })
    .catch((err) => console.log(err));
};
//update author
const updateAuthorController = (req, res) => {
  const { id, name, gender, age, country } = req.body;
  AuthorModel.findById({ _id: id })
    .then((author) => {
      if (id) {
        (author.name = name),
          (author.gender = gender),
          (author.age = age),
          (author.country = country),
          author.save();

        res.json({ message: "author update successful", data: author });
      }
      res.json({ message: "author update failed" });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  listAuthorController,
  createAuthorController,
  updateAuthorController,
};
