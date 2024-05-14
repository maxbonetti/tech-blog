const router = require('express').Router();
const { User } = require('../models');

//POST - Register a new user
const registerUser = async (req, res) => {
    try {
      const userData = await User.create(req.body);
      req.session.save(() => {
        req.session.userId = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };
// POST - /users/login
const loginUser = async (req, res) => {
    try {
      const userData = await User.findOne({ where: { username: req.body.username } });
      if (!userData || !userData.checkPassword(req.body.password)) {
        res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      req.session.save(() => {
        req.session.userId = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;
  
        res.status(200).json({ user: userData, message: 'You are now logged in!' });
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  module.exports = {
    registerUser,
    loginUser
  };