const asyncHandler = require("express-async-handler");

exports.loadWebsite = asyncHandler(async (req, res, next) => {
  res.render("index");
});

