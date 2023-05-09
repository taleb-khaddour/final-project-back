import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import Admin from "./router/Admin_router.js";
import Product from "./router/product_router.js";
import cookieParser from 'cookie-parser';






dotenv.config();

connectDB();
const PORT = process.env.PORT||3000;
const app = new express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// app.use(cookieParser())
app.get("/", (req, res) => {
  res.send("API is running ...");
});
app.use(express.urlencoded({extended:false}));
app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`)
);
app.use("/dashboard/admin", Admin);
app.use("/dashboard/product", Product);
app.use(cookieParser());

//handling invalid requests
app.use("*", (req, res) => {
  res.status(400).send({
    status: 400,
    error: true,
    message: "Please enter a valid request!",
  });
});
//error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send({
    success: false,
    message: err.message,
  });

});
app.use(function(req, res, next) {
  next(createError(404));
 });
