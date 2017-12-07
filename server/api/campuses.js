const router = require('express').Router()
const { Campuses } = require('../db/models/index');

router.post('/', (req, res, next) => {
  Campuses.create(req.body)
    .then(newCampus => res.send(newCampus))
    .catch(next);
})

router.get('/', (req, res, next) => {
  Campuses.findAll()
    .then(campuses => res.send(campuses))
    .catch(next);
})

router.get('/:id', (req, res, next) => {
  Campuses.findOne({where: {id: req.params.id}})
    .then(campus => res.send(campus))
    .catch(next);
})

router.put('/:id', (req, res, next) => {
  fieldsToUpdate = {};

  if (req.body.name) fieldsToUpdate.name = req.body.name;
  if (req.body.imageURL) fieldsToUpdate.imageURL = req.body.imageURL;
  if (req.body.description) fieldsToUpdate.description = req.body.description;

  Campuses.update(fieldsToUpdate, { where: {id: req.params.id}})
    .then(() => Campuses.findOne({ where: { id: req.params.id }}))
    .then(editedCampus => res.send(editedCampus))
    .catch(next);
})

router.delete('/:id', (req, res, next) => {
  Campuses.destroy({where: {id: req.params.id}})
    .then(() => res.sendStatus(200))
    .catch(next);
})


module.exports = router;
