const Pool = require("../config/db");

const addProducts = ({ name, sellprice, buyprice, stock, photo }, id_users) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO products(name,sellprice,buyprice,stock,photo,id_users) VALUES ('${name}','${sellprice}','${buyprice}','${stock}','${photo}','1')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

const updateProducts = ({ id, name, sellprice, buyprice, stock, photo }) => {
  console.log(sellprice, buyprice, stock, "ini yuang di model");
  return new Promise((resolve, reject) => {
    Pool.query(
      `UPDATE products SET name = COALESCE($2, name), sellprice = COALESCE($3, sellprice), buyprice = COALESCE($4, buyprice),
      stock = COALESCE($5, stock),photo = COALESCE($6, photo) WHERE id = $1`,
      [id, name, sellprice, buyprice, stock, photo],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};
const getDetailProduct = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT products.id, products.name,products.sellprice,products.buyprice,products.stock,products.photo FROM products as products WHERE products.id = '${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};
const deleteProducts = (id) => {
  console.log(id);
  return new Promise((resolve, reject) => {
    Pool.query(`DELETE FROM products WHERE id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

const getAll = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT products.id, products.name,products.sellprice,products.buyprice,products.stock,products.photo FROM products as products
        WHERE products.name ILIKE ('%${search}%') ORDER BY products.${sortBy} `,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

module.exports = {
  addProducts,
  updateProducts,
  deleteProducts,
  getAll,
  getDetailProduct,
};
