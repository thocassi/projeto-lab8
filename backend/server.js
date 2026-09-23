const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

// Habilita o CORS para permitir requisições do Front-end
app.use(cors());

// A nuvem (Render) injeta a porta via process.env.PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});