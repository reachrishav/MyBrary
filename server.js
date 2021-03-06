if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(methodOverride("_method"));

app.use("/", indexRouter);
app.use("/authors/", authorRouter);
app.use("/books/", bookRouter);

app.listen(process.env.PORT || 3000);

mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log(`DB Ok`);
    })
    .catch((err) => {
        console.log(`db error ${err.message}`);
        process.exit(-1);
    });
