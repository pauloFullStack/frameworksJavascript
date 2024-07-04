const asyncHandler = require("express-async-handler");
const { sections } = require("../redirectHtml/section/index");
const { editSection } = require("../redirectHtml/editSection/index");
const { editPage } = require("../redirectHtml/editPage/index");
const { singlePage } = require("../redirectHtml/page/index");


exports.index = asyncHandler(async (req, res, next) => {
  res.render("codeLibrary/index");
});


exports.login = asyncHandler(async (req, res, next) => {
  res.render("codeLibrary/login");
});


exports.section = asyncHandler(async (req, res, next) => {
  // param: req.params.id
  return res.json(await sections.index(req));
});


exports.page = asyncHandler(async (req, res, next) => {
  return res.json(await singlePage.index(req));
});


exports.edit = asyncHandler(async (req, res, next) => {
  res.render("codeLibrary/edit");
});


exports.editSection = asyncHandler(async (req, res, next) => {
  return res.json(await editSection.index());
});


exports.editSectionAdd = asyncHandler(async (req, res, next) => {
  return res.json(editSection.formAdd());
});


exports.editPage = asyncHandler(async (req, res, next) => {
  return res.json(await editPage.index(req.body.getPreviousRouteId, req.body.getPreviousRouteId));
});


exports.editPageAdd = asyncHandler(async (req, res, next) => {
  return res.json(await editPage.formAdd());
});

