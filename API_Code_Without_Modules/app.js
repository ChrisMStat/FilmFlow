const { request } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bycrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { restart } = require("nodemon");
//const { Next } = require("react-bootstrap/esm/PageItem");
const JWT_SECRET = "jdsklfjsdfioenwiofnfiofjksjgasfjdkasghaweiu3h245";

const monoURL =
  "mongodb+srv://FilmFlow:filmingflow@cluster0.9esjxby.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(monoURL, {})
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetails");
const User = mongoose.model("UserInfo");

app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;
  const encrptedPassword = await bycrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({
      email,
    });
    if (oldUser) {
      return res.send({ error: "User already exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encrptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/userInfo", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;

    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.post("/addbadmovie", async (req, res) => {
  const { email, password, movID } = req.body;
  //console.log(movID);
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User not found" });
  }

  if (res.status(201)) {
    await User.findOneAndUpdate(
      {
        email: email,
      },
      {
        $push: {
          badmovID: movID,
        },
      }
    );
    return res.json({ status: "ok", data: "token" });
  } else {
    return res.json({ error: "error" });
  }
});

app.post("/addmovie", async (req, res) => {
  const { email, password, movID } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User not found" });
  }

  if (res.status(201)) {
    await User.findOneAndUpdate(
      {
        email: email,
      },
      {
        $push: {
          movID: movID,
        },
      }
    );
    return res.json({ status: "ok", data: "token" });
  } else {
    return res.json({ error: "error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password, movID } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User not found" });
  }
  if (await bycrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      await User.findOneAndUpdate(
        {
          email: email,
        },
        {
          $push: {
            movID: movID,
          },
        }
      );
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ error: "error", error: "Invalid passsword" });
});

app.listen(5000, () => {
  console.log("Server Started");
});
