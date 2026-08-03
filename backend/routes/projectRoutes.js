const express = require('express');
const router = express.Router();
const { getProjects, addProject, deleteProject } = require('../controllers/projectController');

router.route('/').get(getProjects).post(addProject);
router.route('/:id').delete(deleteProject);

module.exports = router;
