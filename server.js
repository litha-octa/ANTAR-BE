require("dotenv").config();
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const { PORT, DB_DATABASE } = process.env;

const app = express();
const port = PORT
const db = DB_DATABASE;
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(express.json())
app.use(express.static("public"))
app.use(morgan('dev'))


app.get('/', (req, res) => {
  res.send(db);
});



const serviceRoutes = require('./src/routes')



app.use("/api/antar", serviceRoutes);



app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

