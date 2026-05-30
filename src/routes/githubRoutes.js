const express = require('express');
const router = express.Router();

const {
    analyzeProfile,
    getAllProfiles,
    getProfileByUsername
} = require("../controllers/githubControllers");

router.post('/analyze/:username', analyzeProfile);
router.get('/profiles',getAllProfiles);
router.get('/profile/:username',getProfileByUsername);

module.exports = router;