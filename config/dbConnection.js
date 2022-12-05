const mongoose = require('mongoose')

mongoose
  .connect(process.env.URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Database conected");
  })
  .catch((e) => {
    console.log(e)
  });

module.exports = mongoose;
