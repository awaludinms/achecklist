const assert = require('assert')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { SECRET_KEY } = require('./../config')

exports.register = async (req, res, next) => {
    const { name, email, password } = req.body
    db = req.app.locals.db
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    db.collection('users').insertOne({name: name, email: email, password: passwordHash}, function(err, r){
        assert.equal(null, err);
        assert.equal(1, r.insertedCount)
        console.log('Succcessfully register use')
        res.status(200).json({message:'Succcessfully registered'})
    })
}

exports.login = async (req, res, next) => {
    db = req.app.locals.db
    const { email, password } = req.body
    console.log(email)

    db.collection('users').find({'email' : email}).toArray( (err, docs) => {

        const passwordHash = docs[0].password
        valid = passwordIsValid(password, passwordHash);
        if (valid) {
            const token = getSignedToken(docs[0])
            res.status(200).json({token: token})
        } else {
            res.status(403).json({forbidden:1})
        }
    })

    // db.collection('users').find({}).toArray(function(err, docs){
    //     assert.equal(err, null)
    //     console.log("Found following records")
    //     console.log(docs)
    //     res.status(200).json(docs)
    // })
}

exports.sayHi = async (req, res, next) => {
    res.end('Hi')
}

getSignedToken = user => {
    return jwt.sign({
        id: user._id,
        email: user.email,
        name: user.name
    }, SECRET_KEY, { expiresIn: '1h'})
}

passwordIsValid = async (password, passwordHash) => {
    try {
        return await bcrypt.compare(password, passwordHash)
    } catch(error) {
        throw new Error(error)
    }
}
