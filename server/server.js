require("dotenv").config();
const express = require("express");
const xss = require("xss-clean");
const helmet = require("helmet");
const hpp = require("hpp");
const rateLimiting = require("express-rate-limit");
const connectToDB = require("./config/connectdb");
const { notFound, errorHandler } = require("./middlewares/errors");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 7777;

//** Connect to MongoDB
connectToDB();

//** Middleware for parsing JSON requests
 app.use(express.json());

 //** Security Headers (helmet) 
app.use(helmet());

//** Prevent Http Param Pollution
app.use(hpp());

 //** Prevent XSS(Cross Site Scripting) Attacks
 app.use(xss());

 //** Rate Limiting
app.use(rateLimiting({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max:200,
}));

//** cors middleware
app.use(cors({
  origin: 'http://localhost:5173', 
}));


 //** mount routes
app.use("/api/auth" , require("./routes/auth.route"));
app.use("/api/users"  , require("./routes/users.route"));
app.use("/api/posts"  , require("./routes/posts.route"));
app.use("/api/comments" , require("./routes/comments.route"));
app.use("/api/category" , require("./routes/category.route"));
app.use("/api/password",require("./routes/password.route"));

//** Error handling middleware
app.use(notFound)
app.use(errorHandler)

//** Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});