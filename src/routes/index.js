const express = require("express");
const router = express.Router();
const UserRouter = require("../routes/user");
const ProductRouter = require("../routes/product");

router.use("/users", UserRouter);
router.use("/products", ProductRouter);

module.exports = router;
