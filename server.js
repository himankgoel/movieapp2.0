require("dotenv").config(); //FOR SAVING SECRET AND KEYS
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.set("useCreateIndex", true);

const port = process.env.PORT || 5000;

//CONNECTING TO MONGODB
const URI = `mongodb+srv://user:s3oTPRp8I89vZ6qC@cluster0.r2ehn.mongodb.net/User?retryWrites=true&w=majority`;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));
//movieUser Schema with Name, Email, Password as Hash

const movieDBUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favouriteMovies: [], //ARRAY OF OBJECTS
});
const movieUser = mongoose.model("movieUser", movieDBUserSchema);

//ROUTES

// @route POST
//@desc GET data of a user
//@Access Public
//  app.post("/api/user/getinfo", (req, res) => {
//     movieUser.findById(req.body.userid)
//     .then(user => res.json(user));
//  });

// @route POST
//@desc  Save new movieUser (Register)
//@Access Public
app.post("/api/user/register", (req, res) => {
  //Checking for empty fields
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(204).json({ msg: "Please enter all the fields!" });
  }
  //Checking for existing user
  movieUser
    .findOne({ email })
    .then((user) => {
      if (user)
        return res.status(400).json({
          msg: "Entered email id already exists. Please Login instead.",
        });
    })
    .catch((err) => {
      console.log(err);
    });
  //Create salt and Hash
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) throw err;
    const newUser = new movieUser({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    newUser.save().then((user) => {
      jwt.sign(
        { id: user.id },
        process.env.JWTSECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, msg: "Registered Successfully!" });
        }
      );
    });
  });
});
// @route POST
//@desc Fetch data of a user(LOGIN)
//@Access Public
app.post("/api/user/login", (req, res) => {
  //Checking for empty fields
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all the fields!" });
  }
  //Checking for existing user
  movieUser.findOne({ email }).then((user) => {
    if (!user)
      return res
        .status(404)
        .json({ msg: "Email doesn't exists. Register instead?" });
    //Validate passwords
    bcrypt.compare(password, user.password, (err, result) => {
      if (!result) return res.status(400).json({ msg: "Invalid Credentials" });
      jwt.sign(
        { id: user.id },
        process.env.JWTSECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({ token, msg: "Login Successful !" });
        }
      );
    });
  });
});

// @route POST
//@desc VERIFYING JWT

app.post("/api/tokenverify", (req, res) => {
  try {
    var decoded = jwt.verify(req.body.token, process.env.JWTSECRET);
    movieUser.findById(decoded.id, (err, user) => {
      if (!err) {
        const user1 = {
          name: user.name,
          favouriteMovies: user.favouriteMovies,
          userLoggedIn: true,
        };
        res.status(200).json({ user1 });
      }
    });
  } catch (err) {
    // err
    res.status(400).json({ msg: "Invalid Data" });
  }
});

// @ROUTE POST
//desc PUSH THE Favourite Movie TO THE DATABASE
app.post("/api/user/addmovie", (req, res) => {
  try {
    var decoded = jwt.verify(req.body.token, process.env.JWTSECRET);
    if (req.body.imdbID === null) return;
    movieUser.findByIdAndUpdate(
      decoded.id,
      { $push: { favouriteMovies: req.body.imdbID } },
      { useFindAndModify: false },
      (err, res) => {
        if (!err) {
          console.log("added to fav");
        }
      }
    );
  } catch (err) {
    console.log("bad request");
  }
});

// @route POST
//desc DELETE THE PARTICULAR NOTE FROM DATABASE BY NOTEID
app.post("/api/user/deletemovie", (req, res) => {
  try {
    var decoded = jwt.verify(req.body.token, process.env.JWTSECRET);
    if (req.body.imdbID === null) return;
    movieUser.findByIdAndUpdate(
      decoded.id,
      { $pull: { favouriteMovies: req.body.imdbID } },
      { useFindAndModify: false },
      (err, res) => {
        if (!err) {
          console.log("removed from fav");
        }
      }
    );
  } catch (err) {
    console.log("bad request");
  }
});

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static("client/build"));
//     app.get("*",(req,res) => {
//         res.sendFile(path.resolve(__dirname,"client","build","index.html"));
//     });
// }
app.listen(port, () => {
  console.log("Server started at port 5000!");
});
