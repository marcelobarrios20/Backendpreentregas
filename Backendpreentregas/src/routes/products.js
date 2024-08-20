const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const fs = require('fs');
const path = require('path');

// Ruta para obtener todos los productos y mostrarlos en index.handlebars
router.get("/", async (req, res) => {
  try {
    const productsFilePath = path.join(__dirname, "../products.json");
    fs.readFile(productsFilePath, "utf-8", (err, data) => {
      if (err) {
        console.error("Error al leer el archivo de productos:", err);
        return res.status(500).send("Error interno del servidor");
      }
      const products = JSON.parse(data);
      res.render("index", { products });
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:pid", productController.getById);
router.post("/", productController.add);
router.put("/:pid", productController.update);
router.delete("/:pid", productController.delete);

// Ruta para mostrar productos en tiempo real usando websockets
router.get("/realtime", (req, res) => {
  res.render("realTimeProducts");
});

module.exports = router;
