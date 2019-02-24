const express = require('express');
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler } = require('../middleware');
const {
  reviewCreate,
  reviewUpdate,
  reviewDestroy
} = require('../controllers/reviews');

/* review reviews create /posts/:id/reviews */
router.post('/', asyncErrorHandler(reviewCreate));

/* PUT reviews update /reviews/:review_id */
router.put('/:review_id', asyncErrorHandler(reviewUpdate));

/* DELETE reviews destroy /posts/:id/reviews/:review_id */
router.delete('/:review_id', asyncErrorHandler(reviewDestroy));

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