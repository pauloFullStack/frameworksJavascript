const express = require('express');
const router = express.Router();
const index = require("../controllers");
const api = require("../controllers/sendEmail");

router.get("/", index.loadWebsite);
router.post("/api/v1/sendEmail", api.sendEmail);

module.exports = router;
