require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((e) => console.log(e))
