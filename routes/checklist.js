const express = require('express')
const router = express.Router()
const checklist = require('./../controllers/checklist')

router.route('/')
    .post(checklist.create)
    .get(checklist.getAllLists)

router.route('/:checklistId')
    .patch(checklist.update)
    .get(checklist.get)
    .delete(checklist.delete)

module.exports = router
