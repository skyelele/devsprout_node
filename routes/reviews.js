const express = require('express');
// mergeParams pulls the id from app.js via app.use()
const router = express.Router({ mergeParams: true });

/* GET reviews index /posts/:id/reviews */
router.get('/', (req, res, next) => {
  res.send('INDEX /posts/:id/reviews')
});

/* review reviews create /posts/:id/reviews */
router.post('/', (req, res, next) => {
  res.send('CREATE /posts/:id/reviews');
});

/* GET reviews edit /posts/:id/reviews/:review_id/edit */
router.get('/:review_id/edit', (req, res, next) => {
  res.send('EDIT /posts/:id/reviews/:review_id/edit')
});

/* PUT reviews update /reviews/:review_id */
router.put('/:review_id', (req, res, next) => {
  res.send('UPDATE /posts/:id/reviews/:review_id')
});

/* DELETE reviews destroy /posts/:id/reviews/:review_id */
router.delete('/:review_id', (req, res, next) => {
  res.send('DELETE /posts/:id/reviews/:review_id')
});

module.exports = router;

/** 
 * GET index      /reviews
 * GET new        /reviews/new
 * review create    /reviews
 * GET show       /reviews/:id
 * GET edit       /reviews/:id/edit
 * PUT update     /reviews/:id
 * DELETE destroy /reviews/:id
 * 

*/