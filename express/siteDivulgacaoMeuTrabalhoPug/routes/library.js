const express = require('express');
const router = express.Router();
const redirectLibrary = require("../controllers/redirectLibrary");
const apiLibrary = require("../controllers/apiLibrary");

router.post("/section", redirectLibrary.section);
router.post("/page", redirectLibrary.page);
router.get("/", redirectLibrary.index);
router.get("/edit", redirectLibrary.edit);

router.post("/edit/section", redirectLibrary.editSection);
router.post("/edit/section/list", redirectLibrary.editSection);
router.post("/edit/section/add", redirectLibrary.editSectionAdd);

router.post("/edit/page", redirectLibrary.editPage);
router.post("/edit/page/list", redirectLibrary.editPage);
router.post("/edit/page/add", redirectLibrary.editPageAdd);

router.post("/edit/login", redirectLibrary.login);

router.post("/api/edit/section/add", apiLibrary.createSection);
router.post("/api/edit/page/add", apiLibrary.createPage);
router.post("/api/create/user", apiLibrary.createUser);
router.post("/api/validate/user", apiLibrary.validateLogin);

module.exports = router;
