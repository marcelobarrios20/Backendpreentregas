const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const productController = require("../controllers/productController");

router.post("/", cartController.add);
router.get("/:cid", cartController.getById);
router.post("/:cid/product/:pid", cartController.addProduct);

router.get("/realtime", async (req, res) => {
  try {
    const products = await productController.getAll();
    console.log(products); // Para verificar que products no es undefined o null
    res.render("realTimeProducts", { products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
