const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, 'data', 'books.json');
const BOOKS = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const nowISO = () => new Date().toISOString();

app.get('/', (_req, res) => res.send("API Ej4 OK. Usa /dataInfoQuery?status=true|false"));

app.get('/dataInfoQuery', (req, res) => {
  const keys = Object.keys(req.query || {});
  if (keys.length !== 1 || !('status' in req.query)) {
    return res.status(400).json({ status: false, msg: "Envía exactamente ?status=true|false", dateTime: nowISO() });
    }
  const raw = String(req.query.status).toLowerCase();
  if (raw !== 'true' && raw !== 'false') {
    return res.status(400).json({ status: false, msg: "status debe ser 'true' o 'false'", dateTime: nowISO() });
  }
  const want = raw === 'true';
  const filtered = BOOKS.filter(b => b.isActive === want);
  res.json({ status: true, data: filtered, dateTime: nowISO() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Ejercicio 4 listo en http://localhost:${PORT}`));
