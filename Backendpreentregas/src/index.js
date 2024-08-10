const express = require("express");
const { create } = require("express-handlebars");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configuración de Handlebars
const hbs = create({
  extname: ".handlebars",
  defaultLayout: "main",
});

app.engine(".handlebars", hbs.engine);
app.set("view engine", ".handlebars");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("add-product", (product) => {
    io.emit("product-added", product);
  });

  socket.on("delete-product", (productId) => {
    io.emit("product-deleted", productId);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// Iniciar servidor
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
