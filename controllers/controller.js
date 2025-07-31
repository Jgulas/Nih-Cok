class Controller {
  static home(req, res) {
    try {
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static listAllProducts(req, res) {
    try {
    } catch (error) {
      console.log(error);
      req.send(error);
    }
  }

  static addProductsItems(req, res) {
    try {
    } catch (error) {
      console.log(error);
      req.send(error);
    }
  }

  static saveProductsItems(req, res) {
    try {
    } catch (error) {
      console.log(error);
      req.send(error);
    }   
  }

  static detailProduct(req, res) {
    try {
    } catch (error) {
      console.log(error);
      req.send(error);
    }
  }
}

module.exports = Controller;
