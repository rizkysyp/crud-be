const express = require("express");
const router = express.Router();
const { productController } = require("./../controller/product");
const { user } = require("../middlewares/auth");
const upload = require("./../middlewares/upload");

//route
router.get("/", user, productController.getAllData);
router.post("/", user, upload.single("photo"), productController.insert);
router.put("/:id", upload.single("photo"), productController.updateProducts);
router.delete("/:id", productController.delete);
router.get("/detail/:id", productController.detail);

module.exports = router;
