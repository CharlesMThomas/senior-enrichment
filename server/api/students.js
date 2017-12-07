const router = require('express').Router()
const { Students, Campuses } = require('../db/models/index');

router.post('/', (req, res, next) => {
  Students.create(req.body)
    .then(newStudent => res.send(newStudent))
    .catch(next);
})

router.get('/', (req, res, next) => {
  Students.findAll()
    .then(students => res.send(students))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Students.findOne({where: {id: req.params.id}, include: [{ model: Campuses }]})
    .then(student => res.send(student))
    .catch(next);
})

router.get('/campuses/:id', (req, res, next) => {
  Students.findAll({where: {campusId: req.params.id}})
    .then(students => res.send(students))
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
  Students.destroy({where: {id: req.params.id}})
    .then(() => res.sendStatus(200))
    .catch(next);
})

module.exports = router;
