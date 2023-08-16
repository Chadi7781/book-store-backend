const express = require("express");
const session = require("express-session");

const userRouter = require("./routes/authentication.routes");

const bookRouter = require('./routes/book.routes.js');
const app = express();

app.use(express.json());

app.use(session({ secret: "fingerpint" }));

const PORT = 5000;

app.use("/user", userRouter);

app.use("/book", bookRouter);

app.listen(PORT, () => console.log("Server is running "));
