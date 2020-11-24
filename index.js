const express = require('express')
const app = express()

const { MONGODB } = require('./config')
const { DBNAME, PORT } = require('./config')

const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const bodyParser = require('body-parser');

const client = new MongoClient(MONGODB, {useUnifiedTopology: true})

const connection = client.connect(function(err){
    assert.equal(null, err);
    console.log("Connected succesfully to MONGO server")

    const db = client.db(DBNAME)
    app.locals.db = db
})

const auth = require('./middleware/auth')

const userRouter = require('./routes/user')
const checklistRouter = require('./routes/checklist')


app.use(bodyParser.json())
app.use('/checklists', auth, checklistRouter)
app.use('/user', userRouter);

app.use((req, res, next) => {
    const error = new Error('not found')
    error.status = 404
    next(error)
})
app.use((err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({error: {message: err.message}})
})

app.listen(8000, () => console.log('Server Running at 8000'))
