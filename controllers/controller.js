const {
  User,
  Profile,
  Product,
  OrderItem,
} = require('../models')

// const sequelize = require("sequelize");
const bcrypt = require('bcryptjs');

// const user = require('../models/user');
class Controller {
  static async home(req, res) {
    try {
      res.render('home')
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async loginForm(req, res) {
    try {
      const { error }= req.query
      res.render('login',{error})
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }//done

  static async postLogin(req, res) {
    try {

      const { name, password } = req.body;
      User.findOne({where: {name}})
        .then(user =>{

  
          if (user) {
            const isValidPassword = bcrypt.compareSync(password, user.password)

            if(isValidPassword){
              req.session.userId = user.id;
              req.session.userRole = user.role;
              return res.redirect('/main');
            } else {
              const fail = "Invalid Usernam/Password"
              return res.redirect(`/login?error=${fail}`)
            };
          } else {
            const fail = "Invalid Usernam/Password"
            return res.redirect(`/login?error=${fail}`)
          }
        });

    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }//done tinggal redirectnya

  static async registerForm(req, res) {
    try {
      res.render('register')
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }//done

  static async registerFormAdd(req, res) {
    try {
      const { name, password, role} = req.body
      // User.create({ name, password, role })
      // .then(newUser =>{
      //   res.redirect('/login')
      // })
      // res.render('/register')
        await User.create({
        name,
        password,
        role
      });

      return res.redirect('/login');
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }//done

  static async listAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.render('productList', {products})
    } catch (error) {
      console.log(error);
      req.send(error);
    }
  }

  static async addProductsItems(req, res) {
    try {
      res.render('addProduct')
    } catch (error) {
      console.log(error);
      req.send(error);
    }
  }

  static async saveProductsItems(req, res) {
    try {
    } catch (error) {
      console.log(error);
      req.send(error);
    }   
  }

  static async detailProduct(req, res) {
    try {
    } catch (error) {
      console.log(error);
      req.send(error);
    }
  }

  static async test(req, res) {
    try {
      res.render('test')
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async listAllProducts(req, res) {
    try {
      let product = await Product.findAll()
      console.log(product);
      res.render('listProduct', {product})
      
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = Controller;
