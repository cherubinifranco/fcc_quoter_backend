const express = require('express')
const quotesRouter = require("./quotesRouter")


module.exports = (app) => {
    app.use(express.json());
    app.use("/quotes", quotesRouter)
}
