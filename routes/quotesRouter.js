const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const Quote = require("../config/models");

// --------------------------- APIs Calls--------------------------- //

router.use((req, res, next) => {
  next();
});

router.get("/sorter", quoteSorter);

router.post("/new", newQuote);

router.get("/author/:author?", quotesByAuthor);

router.get("/id/:id?", quoteById);

// --------------------------- Main ---------------------------//

function newQuote(req, res) {
  new Quote({
    quote: req.body.quote,
    author: req.body.author.toLowerCase() || "anonymous",
  })
    .save()
    .then((savedQuote) => {
      res.json({
        quote: savedQuote.quote,
        author: savedQuote.author
      });
    });
}
function quotesByAuthor(req, res) {
  Quote.find({ author: req.params.author.toLowerCase() })
    .then(function (list) {
      res.send(list);
    })
    .catch((e) => console.log(e));
}

function quoteSorter(req, res) {
  Quote.find({}, { quote: 1, author: 1, _id: 0 })
    .then(function (list) {
      let random = Math.floor(Math.random() * list.length);
      res.json(list[random]);
    })

    .catch((e) => {
      console.log(e);
    });
}

function quoteById(req, res) {
  if (req.params.id.length !== 24) {
    return res.send("Wrong format, the id must be 24 characters long");
  }
  Quote.findById(req.params.id).then(function (quoteObj) {
    if (!quoteObj) return res.json({ error: "Error: No quote by this id" });

    res.json(quoteObj);
  });
}

module.exports = router;
