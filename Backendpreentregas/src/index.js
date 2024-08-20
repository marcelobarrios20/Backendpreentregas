const express = require("express");
const { create } = require("express-handlebars");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const productsRouter = require("./routes/products");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configuración de Handlebars
app.engine(".handlebars", create({ extname: ".handlebars" }).engine);
app.set("view engine", ".handlebars");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.use("/products", productsRouter);

const productsFilePath = path.join(__dirname, "products.json");

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("request-products", () => {
    fs.readFile(productsFilePath, "utf-8", (err, data) => {
      if (err) {
        console.error("Error al leer el archivo de productos:", err);
        return;
      }
      const products = JSON.parse(data);
      socket.emit("update-products", products);
    });
  });

  socket.on("delete-product", (productId) => {
    fs.readFile(productsFilePath, "utf-8", (err, data) => {
      if (err) {
        console.error("Error al leer el archivo de productos:", err);
        return;
      }
      let products = JSON.parse(data);
      products = products.filter(
        (product) => product.id !== parseInt(productId)
      );
      fs.writeFile(
        productsFilePath,
        JSON.stringify(products, null, 2),
        (err) => {
          if (err) {
            console.error("Error al escribir en el archivo de productos:", err);
            return;
          }
          io.emit("product-deleted", productId);
          io.emit("update-products", products);
        }
      );
    });
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// Iniciar servidor
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
