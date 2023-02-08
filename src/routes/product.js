const express = require("express");
const router = express.Router();
const { productController } = require("./../controller/product");
const { protect } = require("../middlewares/auth");
const upload = require("./../middlewares/upload");

//route
router.get("/", productController.getAllData);
router.post("/", upload.single("photo"), productController.insert);
router.put("/:id", upload.single("photo"), productController.updateProducts);
router.delete("/:id", productController.delete);
router.get("/detail/:id", productController.detail);

module.exports = router;
