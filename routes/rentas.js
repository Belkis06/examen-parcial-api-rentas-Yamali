const express = require('express');
const router = express.Router();
const rentas = require('../services/rentas');

/* GET rentas. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await rentas.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting rentas `, err.message);
    next(err);
  }
});

/* PUT rentas */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await rentas.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating rentas`, err.message);
    next(err);
  }
});

/* POST rentas */
router.post('/', async function(req, res, next) {
  try {
    res.json(await rentas.create(req.body));
  } catch (err) {
    console.error(`Error while creating rentas`, err.message);
    next(err);
  }
});

/* DELETE rentas */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await rentas.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting rentas`, err.message);
    next(err);
  }
});
module.exports = router;