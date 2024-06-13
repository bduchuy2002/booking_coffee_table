const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
const coffeeRoute = require("./routes/coffee.js");
const customerRoute = require("./routes/customer.js");
const bookingRoute = require("./routes/booking.js");
const { swaggerUi, swaggerSpec } = require('./swagger');


app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.get("/api", (req, res) => {
    res.status(200).json("Hellosss");
})
dotenv.config();
mongoose.connect( (process.env.MONGODB_URL), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Kết nối thành công đến MongoDB Atlas");
    })
    .catch((err) => {
        console.error("Lỗi kết nối đến MongoDB Atlas:", err.message);
    });
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/v1/coffee", coffeeRoute);
app.use("/v2/customer", customerRoute);
app.use("/v3/booking", bookingRoute);
app.listen(8000, () => {
  console.log("server runningg");
});