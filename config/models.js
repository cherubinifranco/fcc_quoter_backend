const mongoose = require('./dbConnection');

const Schema = mongoose.Schema;
const model = mongoose.model;

const QuoteSchema = new Schema({
    quote: {
        type: String,
        required: true
    },
    author: {
        type: String,
        require: true,
        default: "Anonymous"
    }
})

const Quote = new model('Quote', QuoteSchema);

module.exports = Quote