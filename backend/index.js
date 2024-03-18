const connectToMongo = require('./db');
const express = require('express')

const app = express()
var cors = require('cors')
connectToMongo();


app.use(cors())

app.use(express.json())
const port = 5000
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(` app listening on port ${port}`)
})