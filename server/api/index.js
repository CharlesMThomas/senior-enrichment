'use strict'
const router = require('express').Router()
const db = require('../db')
const campuses = require('./campuses');
const students = require('./students');

router.use('/campuses', require('./campuses'));
router.use('/students', require('./students'));

module.exports = router;
