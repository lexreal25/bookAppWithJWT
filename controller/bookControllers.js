const BookModel = require("../models/BookModel");
//import validationjs
const { validationResult } = require("express-validator");


//controllers
const listBookController = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.json(error);
    }

    const { id } = req.params;
    //find specific book
    if (id) {
      BookModel.findById({ id })
        .then((book) => {
          res.json({ data: book });
        })
        .catch(error);
    } else {
      BookModel.find({})
        .then((books) => {
          res.json({ data: books });
        })
        .catch(error);
    }
  } catch (error) {
    console.log(error);
  }
};

//create books
const createBookController = (req, res) => {
  const { title, author, gist, publisher, YOP } = req.body;
  //bookdModel instance
  const books = new BookModel({ title, author, gist, publisher, YOP });
  books
    .save()
    .then((result) => {
      console.log(result);
      res.json({ message: `${books.title} created successfuly`, data: result });
    })
    .catch((err) => console.log(err));
};

//update book
const updateBookController = (req, res) => {
  const { id, title, author, gist, publisher, YOP } = req.body;
  BookModel.findById({ _id: id })
    .then((book) => {
      if (book) {
        (book.title = title),
          (book.author = author),
          (book.gist = gist),
          (book.publisher = publisher),
          (book.YOP = YOP);

        book.save();
        res.json({ message: "book updated", data: book });
        return book;
      }
      res.json({ message: "update failed" });
    })
    .catch((err) => console.log(err));
};

//delete book
const deleteBookController = (req, res) => {
  const { id } = req.body;
  //delete by specific ID
  BookModel.findByIdAndRemove(id)
    .then((deletedBook) => {
      if (deletedBook) {
        res.json({ message: "book deleted", data: deletedBook });
        return;
      }
      res.json({ message: "book not found" });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  listBookController,
  createBookController,
  updateBookController,
  deleteBookController,
};
