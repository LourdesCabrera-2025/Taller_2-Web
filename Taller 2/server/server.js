import express from "express";
import data from "./data.js";

const app = express();
const PORT = 3000;

app.get("/allData", (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
