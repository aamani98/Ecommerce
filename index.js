const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./models");
const { authRoutes, productRoutes, orderRoutes } = require("./routes");
const PORT = 3000 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);

app.listen(PORT, () => console.log(`Server Listening on ${PORT}`));
