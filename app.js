const express = require('express');
const app = express();
const port = 3000
const router = require('./routers/router.js');
const session = require('express-session');
const flash = require('connect-flash');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true 
  }
}))


app.use(flash());
app.use((req, res, next) => {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})