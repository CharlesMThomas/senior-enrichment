const router = require('express').Router()
const { Students, Campuses } = require('../db/models/index');

router.post('/', (req, res, next) => {
  Students.create(req.body)
    .then(newStudent => Students.findOne({where: {id: newStudent.id}, include: [Campuses]}))
    .then(newStudentWithCampus => res.send(newStudentWithCampus))
    .catch(next);
})

router.get('/', (req, res, next) => {
  Students.findAll({ include: [Campuses] })
    .then(students => res.send(students))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Students.findOne({where: {id: req.params.id}, include: [{ model: Campuses }]})
    .then(student => res.send(student))
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  Students.update(req.body, {where: {id: req.params.id}})
    .then(() => Students.findOne({ where: { id: req.params.id }, include: [Campuses]}))
    .then(updatedStudent => res.send(updatedStudent))
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
  Students.destroy({where: {id: req.params.id}})
    .then(() => res.sendStatus(200))
    .catch(next);
})

module.exports = router;
