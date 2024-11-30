const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOption = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOption));
app.use(flash());

app.use((req,res,next)=>{
  res.locals.msg = req.flash("success");
  res.locals.errmsg = req.flash("error");
  next();
})

app.get("/register", (req, res) => {
  let { name = "anonymus" } = req.query;
  req.session.name = name;
  if (name === "anonymus") {
    req.flash("error", "User not register");
  } else {
    req.flash("success", "User register successfully");
  }

  // console.log(req.session)
  res.send("register");
});

app.get("/hello", (req, res) => {
  // const messages=req.flash("success");
  // console.log("messages",messages)
  // res.locals.msg=messages.length > 0 ? messages[0] : null;
  res.render("page.ejs", { name: req.session.name });
  // res.send(`Hello ${req.session.name}`);
});

app.get("/test", (req, res) => {
  res.send("test successful");
});

app.listen(3000, () => {
  console.log("server is listing on 3000 port");
});
