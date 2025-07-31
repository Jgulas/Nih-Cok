const express = require('express');
const Controller = require('../controllers/controller');
const router = express.Router()

router.get('/', Controller.home);
// GET REGISTER
router.get('/register', Controller.registerForm);
// POST REGISTER 
router.post('/register', Controller.saveRegisterForm);
// router.get('/checkPage',)
router.get('/profile', Controller.profile)
router.post('/profile', Controller.saveProfile)

router.get('/products', Controller.listAllProducts)
router.get('/products/add', Controller.addProductsItems)
router.post('/products/add', Controller.saveProductsItems)
router.get('/products/:id', Controller.detailProduct)


module.exports = router;
