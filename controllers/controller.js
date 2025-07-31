const { User, Profile, Product, OrderItem } = require("../models");

// const sequelize = require("sequelize");
const bcrypt = require("bcryptjs");

// const user = require('../models/user');
class Controller {
  static async home(req, res) {
    try {
      res.render("home");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async loginForm(req, res) {
    try {
      const { error } = req.query;
      res.render("login", { error });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  } //done

  static async postLogin(req, res) {
    try {
      const { name, password } = req.body;
      User.findOne({ where: { name } }).then((user) => {
        console.log(user, "ini userr");

        if (user) {
          const isValidPassword = bcrypt.compareSync(password, user.password);

          if (isValidPassword) {
            req.session.userId = user.id;
            req.session.userRole = user.role;
            if (user.role === "admin") {
              return res.redirect("/main");
            } else {
              return res.redirect("/products");
            }
          } else {
            const fail = "Invalid Usernam/Password";
            return res.redirect(`/login?error=${fail}`);
          }
        } else {
          const fail = "Invalid Usernam/Password";
          return res.redirect(`/login?error=${fail}`);
        }
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  } //done tinggal redirectnya

  static async registerForm(req, res) {
    try {
      res.render("register");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  } //done

  static async registerFormAdd(req, res) {
    try {
      const { name, password, role } = req.body;
      // User.create({ name, password, role })
      // .then(newUser =>{
      //   res.redirect('/login')
      // })
      // res.render('/register')
      await User.create({
        name,
        password,
        role,
      });

      return res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  } //done

  static async listAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      res.render("productList", { products });
    } catch (error) {
      console.log(error);
      req.send(error);
    }
  }

  static async addProductsItems(req, res) {
    try {
      res.render("addProduct");
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
      const id = req.params.id;
      // console.log(id);

      let product = await Product.findOne({
        where: {
          id: +id,
        },
      });
      // console.log(product);
      res.render("editProduct", { product });
    } catch (error) {
      console.log(error);
      req.send(error);
    }
  }

  static async profilePage(req, res) {
    try {
      const userId = req.session.userId;
      const user = await User.findByPk(userId, {
        include: Profile,
      });

      res.render("profile", { user });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  } //done

  static async editProfileForm(req, res) {
    try {
      const userId = req.session.userId;
      const user = await User.findByPk(userId, {
        include: Profile,
      });

      res.render("editProfile", { user });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  } //done

  static async saveEditProfile(req, res) {
    try {
      const userId = req.session.userId;
      const { name, email, phone, birthDate } = req.body;

      // Update Users table
      await User.update({ name }, { where: { id: userId } });

      // Update Profiles table
      await Profile.update(
        { email, phone, birthDate },
        { where: { UserId: userId } }
      );

      res.redirect("/profile");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  } //blm bisa ke save

  static async test(req, res) {
    try {
      res.render("test");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async listAllProducts(req, res) {
    try {
      let product = await Product.findAll();
      // console.log(product);
      res.render("listProduct", { product });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async saveDetailProduct(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      // console.log(body, 'ini body');
      await Product.update(
        {
          name: body.name,
          price: body.price,
          stock: body.stock,
          description: body.description,
          imageUrl: body.imageUrl,
        },
        {
          where: {
            id: +id,
          },
        }
      );
      res.redirect("/products");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async deleteProduct(req, res) {
    try {
      const id = req.params.id;
      // console.log(id);
      await Product.destroy({
        where: {
          id: +id,
        },
      });
      res.redirect("/products");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async productsForBuyer(req, res) {
    try {
      let product = await Product.findAll();
      res.render("listProductBuyer", { product });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = Controller;
