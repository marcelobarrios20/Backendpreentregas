const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAll);
router.get("/:pid", productController.getById);
router.post("/", productController.add);
router.put("/:pid", productController.update);
router.delete("/:pid", productController.delete);

router.get("/realtime", async (req, res) => {
  const products = await productController.getAll(req, res);
  res.render("realTimeProducts", { products });
});

module.exports = router;
