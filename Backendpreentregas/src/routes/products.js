const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Ruta para obtener todos los productos con paginación, filtrado y ordenamiento
router.get("/", productController.getAll);

router.get("/:pid", productController.getById);
router.post("/", productController.add);
router.put("/:pid", productController.update);
router.delete("/:pid", productController.delete);

// Ruta para mostrar productos en tiempo real usando websockets
router.get("/realtime", (req, res) => {
  res.render("realTimeProducts");
});

module.exports = router;
