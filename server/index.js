const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { log } = require("console");
const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");
const orderRoute = require("./routes/order.route")
const bodyParser = require("body-parser")

require('dotenv').config({ path: '.env' });

const app = express();

//Used with React!
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const maxRequestBodySize = '5mb';
// app.use(express.json({ limit: maxRequestBodySize }));
// app.use(express.urlencoded({ limit: maxRequestBodySize }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(productRoute);
app.use(userRoute);
app.use(orderRoute)

mongoose
  .connect(
    process.env.DB_CONNECTION,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "macloops" //Collection Name
    }
  )
  .then(() => {
    console.log("Connected to the DB");
  })
  .catch(err => {
    console.log("No Connection. Error:" + err);
  });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
