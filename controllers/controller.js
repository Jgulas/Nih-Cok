const { User, sequelize, Profile, Product } = require("../models/index");
// const { use } = require("react");

class Controller {
  static async home(req, res) {
    try {
      res.redirect("/register");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async logPage(req, res) {
    try {
      res.render("loginPage");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async registerForm(req, res) {
    try {
      let user = await User.findAll();
      console.log(user);

      res.render("register", { user });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async saveRegisterForm(req, res) {
    try {
      const body = req.body;
      console.log(body);
      await User.create({
        name: body.name,
        password: body.password,
        email: body.email,
        title: body.title,
        role: body.role,
      });
      res.redirect("/profile");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async profile(req, res) {
    try {
      res.render("loginProfile");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async saveProfile(req, res) {
    try {
      const body = req.body;
      // console.log(body);

      await Profile.create({
        phone: body.phone,
        birthDate: body.birthDate,
        email: body.email,
      });

      res.redirect("/products");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async listAllProducts(req, res) {
    try {
      let product = await Product.findAll();
      res.render("firstPage", {product});
    } catch (error) {
      console.log(error);
      req.send(error);
    }
  }

  static async addProductsItems(req, res) {
    try {
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
}

module.exports = Controller;
