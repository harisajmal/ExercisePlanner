const express = require('express');
const controller = require('../controllers/trainingControllers');
const router = express.Router();

router.get('/', controller.landing_page);

router.get('/training', controller.entries_list);

router.get('/about', controller.about_page);

router.get('/new', controller.new_entry);

router.get('/delete/:id', controller.delete_entry);

router.get('/haris', controller.haris_entries);

router.post('/new', controller.post_new_entry);

module.exports = router;