import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import user from "./router/userRouter.js";
import cookieParser from 'cookie-parser';
import cors from "cors";
import helmet from 'helmet';
import category from "./router/category_route.js";
import subCategories from "./router/sub_category_router.js";
import flavour from "./router/flavour-route.js";
import suggestion from "./router/suggestion_route.js";
import contact_us from "./router/contact_route.js";
import bodyParser from "body-parser";









dotenv.config();

connectDB();
const PORT = process.env.PORT||3000;
const app =  express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(morgan('tiny'))
// app.use(express.json())
// app.use(express.raw())
// app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("./uploads"))
app.use(cors());


// app.use(cookieParser())
app.get("/", (req, res) => {
  res.send("API is running ...");
});
app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`)
);
app.use("/api/user", user );
app.use("/api/suggestion", suggestion );
app.use("/api/flavour", flavour);
app.use("/api/subCategory", subCategories );
app.use("/api/category", category );
app.use("/api/contact",contact_us );



app.use(cookieParser());

//handling invalid requests
app.use("*", (req, res) => {
  res.status(400).send({
    status: 400,
    error: true,
    message: "Please enter a valid request!",
  });
});

// //error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send({
    success: false,
    message: err.message,
  });

});
app.use(function(req, res, next) {
  next(createError(404));
 });
