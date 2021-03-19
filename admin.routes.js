const path = require('path');
const fs = require('fs');
const Router = require('express').Router();

Router.get('/login', (req, res) => {
   res.sendFile(path.join(__dirname, 'admin', 'pages', 'login.html'));
});

Router.get('/signup', (req, res) => {
   res.sendFile(path.join(__dirname, 'admin', 'pages', 'signup.html'));
});

Router.post('/signup', (req, res) => {
   try {
      const { email, password } = req.body;
      if (!email || !password) {
         res.send('all fields are required <a href="/signup">try again</a>');
      }
      //   get database
      const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'database', 'users.db.json')));

      //   update database
      users.push({ email, password });
      fs.writeFileSync(path.join(__dirname, 'database', 'users.db.json'), JSON.stringify(users));

      //   send response
      res.send('signup success <a href="/login">login</a>');
   } catch (err) {
      console.log(err);
      res.send(`${err.message} <a href="/signup">try again</a>`);
   }
});

Router.get('/panel', (req, res) => {
   res.sendFile(path.join(__dirname, 'admin', 'pages', 'panel.html'));
});

module.exports = Router;
