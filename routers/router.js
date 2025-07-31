const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router();

// GET REGISTER
router.get('/register', Controller.registerForm);
// POST REGISTER 
router.post('/register', Controller.registerFormAdd);

// GET login
router.get('/login', Controller.loginForm);
// POST login 
router.post('/login', Controller.postLogin);

// const member = function(req, res, next) {
//   console.log('Time:', Date.now());
//   next();
// };
router.use(function(req, res, next) {
  console.log('Time:', Date.now());
  next();
});// buat blokir harus login dulu

router.get('/', Controller.home);


router.get('/main', Controller.test);

router.get('/products', Controller.x)
router.get('/products/add', Controller.addProductsItems)
router.post('/products/add', Controller.saveProductsItems)
router.get('/products/:id', Controller.detailProduct)

module.exports = router;
