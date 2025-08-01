const { User, Profile, Product, OrderItem } = require("../models");

// const sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const product = require("../models/product");

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
      // const { error } = req.query;
      res.render("login");//, { error }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  } //done

  // static async postLogin(req, res) {
  //   try {
  //     const { name, password } = req.body;
  //     User.findOne({ where: { name } }).then(async (user) => {
  //       let userProfile = await Profile.findOne({
  //         where: {
  //           UserId: user.id,
  //         },
  //       });

  //       if (!user){
  //         // const fail = "Invalid Usernam/Password";
  //         // return res.redirect(`/login?error=${fail}`);
  //         req.flash('error', 'Username / Password salah');
  //         return res.redirect('/login');
  //       }

  //       else if (user) {
  //         const isValidPassword = bcrypt.compareSync(password, user.password);

  //         if (isValidPassword) {
  //           req.session.userId = user.id;
  //           req.session.userRole = user.role;
  //           if (user.role === "admin") {
  //             return res.redirect("/main");
  //           } else {
  //             return res.redirect(`/product-list/${userProfile.id}`);
  //           }
  //         } else {
  //           // const fail = "Invalid Usernam/Password";
  //           // return res.redirect(`/login?error=${fail}`);
  //           req.flash('error', 'Username / Password salah');
  //           return res.redirect('/login');

  //         }
  //       } 
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.send(error);
  //   }
  // } //done 

  static async postLogin(req, res) {
    try {
      const { name, password } = req.body;

      const user = await User.findOne({ where: { name } });

      if (!user) {
        req.flash('error', 'Username / Password salah');
        return res.redirect('/login');
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        req.flash('error', 'Username / Password salah');
        return res.redirect('/login');
      }

      const userProfile = await Profile.findOne({
        where: {
          UserId: user.id,
        },
      });

      req.session.userId = user.id;
      req.session.userRole = user.role;

    
      return res.redirect(`/product-list/${userProfile.id}`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  } //done

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
      const body = req.body
      // console.log(body);
      await Product.create({
        name: body.name,
        price: body.price,
        stock: body.stock,
        description: body.description,
        imageUrl: body.imageUrl
      })

      res.redirect('/main')
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

      const newUser = {
        ...user.dataValues,
        Profile: {
          ...user.dataValues.Profile.dataValues,
          birthDate: Controller.formatDateLocal(
            user.dataValues.Profile.birthDate
          ),
        },
      };
      
      res.render("profile", { user: newUser });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  } //done

  static formatDateLocal(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  static async showAddProfileForm(req, res) {
    try {
      const userId = req.session.userId;
      if (!userId) return res.redirect("/login");

      const user = await User.findByPk(userId, {
        include: Profile,
      });

      if (user.Profile) return res.redirect("/profile");

      res.render("addProfile", { error: null, userId });
    } catch (err) {
      res.send(err);
    }
  }

  static async postAddProfile(req, res) {
    try {
      const userId = req.session.userId;
      if (!userId) return res.redirect("/login");

      const { email, phone, birthDate } = req.body;

      await Profile.create({
        UserId: userId,
        email,
        phone,
        birthDate,
      });

      res.redirect("/profile");
    } catch (err) {
      console.log(err);
      res.render("addProfile", {
        error: err.message,
        userId: req.session.userId,
      });
    }
  }

  static async editProfileForm(req, res) {
    try {
      const userId = req.session.userId;
      const user = await User.findByPk(userId, {
        include: Profile,
      });

      const newUser = {
        ...user.dataValues,
        Profile: {
          ...user.dataValues.Profile.dataValues,
          birthDate: Controller.formatDateLocal(
            user.dataValues.Profile.birthDate
          ),
        },
      };

      res.render("editProfile", { user: newUser });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  } //done

  static async saveEditProfile(req, res) {
    try {
      const userId = req.session.userId;
      const { name, email, phone, birthDate } = req.body;

      // // Update Users table
      // await User.update({ name }, { where: { id: userId } });

      // // Update Profiles table
      // await Profile.update(
      //   { email, phone, birthDate },
      //   { where: { UserId: userId } }
      // );
      const existingProfile = await Profile.findOne({
        where: { UserId: userId },
      });

      if (existingProfile) {
        // Sudah ada, tinggal update
        await Profile.update(
          { email, phone, birthDate },
          { where: { UserId: userId } }
        );
      } else {
        // Belum ada, maka buat baru
        await Profile.create({
          UserId: userId,
          email,
          phone,
          birthDate,
        });
      }

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
      res.redirect("/main");
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
      res.redirect("/main");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async productsForBuyer(req, res) {
    try {
      const userid = req.params.userid;
      let product = await Product.findAll();
      res.render("listProductBuyer", { product, userid });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async createOrder(req, res) {
    try {
      const body = req.body;
      const userid = req.params.userid;
      const productid = req.params.productid;
      // console.log(body, req.params);
      await OrderItem.create({
        price: body.price,
        quantity: 1,
        UserProfileId: userid,
        ProductId: productid,
        status: "Purchased",
      });
      res.redirect(`/order-history/${userid}`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async showOrder(req, res) {
    try {
      const id = req.params.userid;
      let order = await OrderItem.findAll(
        {
          include: [
            {
              model: Product,
            },
          ],
        },
        {
          where: {
            UserProfileId: +id,
          },
        }
      );

      res.render("history", { order, id });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = Controller;
