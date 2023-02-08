const { response } = require(`../middlewares/response`);
const cloudinary = require("../config/photo");
const ModelProduct = require("../model/product");

const productController = {
  insert: async (req, res, next) => {
    try {
      const id_users = req.payload.id;
      const { name, sellprice, buyprice, stock } = req.body;

      const image = await cloudinary.uploader.upload(req.file.path, {
        folder: "toko",
      });

      const data = {
        id_users,
        name,
        sellprice,
        buyprice,
        stock,
        photo: image.url,
      };

      await ModelProduct.addProducts(data);
      return response(res, 200, true, data, "input data success");
    } catch (error) {
      return response(res, 404, false, error, "input data fail");
    }
  },
  getAllData: async (req, res, next) => {
    try {
      const sortBy = req.query.sortBy || "name";
      const sortOrder = req.query.sortOrder || "DESC";
      const search = req.query.search || "";
      const id_users = req.payload.id;
      console.log(id_users, "ini id controller");
      const result = await ModelProduct.getAll({
        search,
        sortBy,
        sortOrder,
        id_users,
      });
      response(res, 200, true, result.rows, "get product success");
    } catch (error) {
      console.log(error);
      response(res, 404, false, null, "get products failed");
    }
  },

  delete: async (req, res) => {
    try {
      await ModelProduct.deleteProducts(req.params.id);
      response(res, 200, true, null, "delete data success");
    } catch (err) {
      return response(res, 404, false, err, "delete data failed");
    }
  },
  getAllData: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || "id";
      const sortOrder = req.query.sortOrder || "DESC";
      const search = req.query.search || "";

      const result = await ModelProduct.getAll({
        search,
        sortBy,
        sortOrder,
      });
      response(res, 200, true, result.rows, "get product success");
    } catch (error) {
      console.log(error);
      response(res, 404, false, null, "get products failed");
    }
  },
  detail: async (req, res) => {
    try {
      const result = await ModelProduct.getDetailProduct(req.params.id);
      response(res, 200, true, result.rows, "delete data success");
    } catch (err) {
      return response(res, 404, false, err, "delete data failed");
    }
  },
  updateProducts: async (req, res, next) => {
    try {
      const id = req.params.id;
      const photo = req.file?.path || null;
      let image;

      if (photo) {
        image = await cloudinary.uploader.upload(photo, {
          folder: "toko",
        });
      }
      const { name, sellprice, buyprice, stock } = req.body;

      const sell = parseInt(sellprice);
      const stok = parseInt(stock);
      const buy = parseInt(buyprice);

      const data = {
        id,
        name: name || null,
        sellprice: sell || null,
        buyprice: buy || null,
        stock: stok || null,
        photo: image?.url,
      };
      console.log(sell, stok, buy);
      await ModelProduct.updateProducts(data);
      response(res, 200, true, data, "update data success");
    } catch (error) {
      console.log(error);

      response(res, 404, false, "update data failed");
    }
  },
};

exports.productController = productController;
