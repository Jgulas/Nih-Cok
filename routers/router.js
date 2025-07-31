const express = require('express');
const Controller = require('../controllers/controller');
const { isLoggedIn,isAdmin } = require('../helpers/helper')
const router = express.Router();

// landing page
router.get('/', Controller.home);
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
// router.use(function(req, res, next) {
//   console.log('Time:', Date.now());
//   next();
// });
router.use(isLoggedIn);// buat blokir harus login dulu

//Main menu
router.get('/main', Controller.listAllProducts);

router.get('/products', Controller.listAllProducts)
router.get('/products/add', isAdmin, Controller.addProductsItems)
router.post('/products/add',isAdmin, Controller.saveProductsItems)
router.get('/products/:id', Controller.detailProduct)

module.exports = router;
