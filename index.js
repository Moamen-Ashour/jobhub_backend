const express = require('express');
const app = express();
const bodyParse = require('body-parser');
const dotenv = require('dotenv');

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const jobRoute = require("./routes/job");
const bookMarkRoute = require("./routes/bookmark");

dotenv.config();


const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL).then(() => console.log('connected to the db ')).catch((err) => { console.log(err) });




app.use(express.json());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));
app.use("/api",authRoute);
app.use("/api/users",userRoute);
app.use("/api/jobs",jobRoute);
app.use("/api/bookmarks",bookMarkRoute);
//localhost:5001/api/register
app.listen( process.env.PORT || 5002, console.log(`Example app listening on port ${ process.env.PORT || 5002}!`));