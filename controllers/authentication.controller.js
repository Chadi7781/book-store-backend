const express = require("express");
const jwt = require("jsonwebtoken");

let users = [];

//Function to check if the user exists
const doesExist = (username) => {
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
};

//Function to check if the user is authenticated
const authenticatedUser = (username, password) => {
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
};

const isAuthenticatedController = function auth(req, res, next) {
  if (req.session.authorization) {
    //get the authorization object stored in the session
    token = req.session.authorization["accessToken"]; //retrieve the token from authorization object
    jwt.verify(token, "access", (err, user) => {
      //Use JWT to verify token
      if (!err) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
};

const loginController = (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      { expiresIn: 60 * 60 }
    );

    req.session.authorization = {
      accessToken,
      username,
    };
    return res
      .status(200)
      .send("User successfully logged in \n token:" + accessToken);
  } else {
    return res
      .status(208)
      .json({ message: "Invalid Login. Check username and password" });
  }
};

const registerController = (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
};

const authenticatedMsgController = (req, res) => {
  return res.status(200).json({
    message: "Hello, You are an authenticated user. Congratulations!",
  });
};

module.exports = {
  isAuthenticatedController,
  authenticatedMsgController,
  loginController,
  registerController,
};
