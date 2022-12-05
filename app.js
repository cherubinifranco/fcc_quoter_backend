require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');


app.use(cors())
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

require("./routes/indexRouter.js")(app);

const listener = app.listen(process.env.PORT || 5000, () => {
  console.log("App is listening in port " + listener.address().port);
});
