const mongoose = require('mongoose')
require('dotenv').config()

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.ozlxols.mongodb.net/?retryWrites=true&w=majority`,
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((e) => console.log(e))
