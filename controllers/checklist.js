const assert = require('assert')
var ObjectId = require('mongodb').ObjectID
const { APP_URL } = require('./../config')

exports.create = async (req, res, next) => {
    const { data } = req.body
    db = req.app.locals.db

    try {
        db.collection('checklists').insertOne(data.attributes, function(err, r){
            assert.equal(null, err);
            assert.equal(1, r.insertedCount)
            console.log('Succcessfully add Checklist')
            console.log(r.ops[0])
            res.status(201).json({data:{type:'checklist', id : r.ops[0]._id, attributes: r.ops[0]}})
        })
    }catch (e) {
        res.status(500).json({status:500, error: "Server Error"})
    }
}

exports.get = async (req, res, next) => {
    const { checklistId } = req.params
    db = req.app.locals.db
    try {
        db.collection('checklists').find({_id:ObjectId(checklistId)}).toArray( (err, docs) => {
            res.status(200).json({data:{type:'checklists', id : docs[0]._id, attributes: docs[0]},'links': APP_URL + '/checklists/' + docs[0]._id })
        })
    } catch(e) {
        res.status(500).json({status:500, error:"Server Error"})
    }
}

exports.update = async (req, res, next) => {
    const { checklistId } = req.params
    db = req.app.locals.db
    try {
        db.collection('checklists').updateOne({_id:ObectId(checklistId)}, (err, r) => {
            assert.equal(err, null)
            assert.equal(1, result.resutl.n)
            res.status(200).json({data:{type:'checklists'}})
        })
    } catch(e) {
        res.status(500).json({status:500, error:'Server Error'})
    }
}

exports.getAllLists = async (req, res, next) => {
    const { checklistId } = req.params
    db = req.app.locals.db
    try {
        db.collection('checklists').find({}).toArray( (err, docs) => {
            res.status(200).json({data:{type:'checklists', id : docs[0]._id, attributes: docs[0]},'links': APP_URL + '/checklists/' + docs[0]._id })
        })
    } catch(e) {
        res.status(500).json({status:500, error:"Server Error"})
    }
}

exports.delete = async (req, res, next) => { }
