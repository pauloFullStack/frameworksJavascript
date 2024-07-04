const asyncHandler = require("express-async-handler");
const { post, put, destroy, selectCustomData } = require("../services/crud");
const { validate } = require("../services/validate");
const { validationConditions } = require("../services/validationConditions");
const { editSection } = require("../redirectHtml/editSection/index");
const section = require('../models/section');
const page = require('../models/page');
const user = require('../models/user');
const bcrypt = require("bcryptjs");


exports.createSection = asyncHandler(async (req, res, next) => {

  validate.requestBodyData(validationConditions.createSection, req);
  return res.status(200).json(await post(req, section, validate));

});


exports.createPage = asyncHandler(async (req, res, next) => {

  validate.requestBodyData(validationConditions.createPage, req);
  return res.status(200).json(await post(req, page, validate));

});

exports.validateLogin = async (req, res) => {
  try {

    if (req.body.email === "" || req.body.password === "") {
      validate.requestBodyData(validationConditions.login, req);
      return res.status(200).json(validate.arrayResponse);
    }

    const validateUser = await user.findOne({
      where: {
        email: req.body.email
      }
    });


    if (validateUser.password) {

      bcrypt.compare(req.body.password, validateUser.password, (err, result) => {

        // if (!result) {
        //   return res.status(200).json({
        //     notification: true,
        //     type_style: "warning",
        //     title_notification: "Atenção",
        //     body_notification: "Erro credenciais!",
        //   });
        // }

        if (result) {
          // req.session.loggedin = true;
          // req.session.userID = validateUser.id;
          // req.session.userName = validateUser.name;
          // return res.status(200).json({ redirect: true, route: 'library/edit' });
          req.session.loggedin = true;
          return res.status(200).json({ redirect: true, route: 'library/edit' });
        } else {

          // {
          //   notification: true,
          //   type_style: "warning",
          //   title_notification: "Atenção",
          //   body_notification: "Erro credenciais!",
          // }
          return res.status(200).json({
            message: 'Erro credenciais!',
            status: false,
            error: true,
            statusColor: 'warning',
            doNotNotifyFields: true,
            color: 'red',
            isClearFields: false
          });
        }
      });

    }


  } catch (error) {
    console.log(error)
  }
}

// exports.validateLogin =  asyncHandler(async (req, res, next) => {

//   try {

//     if (req.body.email === "" || req.body.password === "") {
//       validate.requestBodyData(validationConditions.login, req);
//       return res.status(200).json(validate.arrayResponse);
//     }

//     const validateUser = await user.findOne({
//       where: {
//         email: req.body.email
//       }
//     });


//     if (validateUser.password) {

//       bcrypt.compare(req.body.password, validateUser.password, (err, result) => {

//         // if (!result) {
//         //   return res.status(200).json({
//         //     notification: true,
//         //     type_style: "warning",
//         //     title_notification: "Atenção",
//         //     body_notification: "Erro credenciais!",
//         //   });
//         // }

//         if (result) {
//           // req.session.loggedin = true;
//           // req.session.userID = validateUser.id;
//           // req.session.userName = validateUser.name;
//           // return res.status(200).json({ redirect: true, route: 'library/edit' });
//           return Promise.resolve({ redirect: true });
//         } else {

//           // {
//           //   notification: true,
//           //   type_style: "warning",
//           //   title_notification: "Atenção",
//           //   body_notification: "Erro credenciais!",
//           // }
//           return res.status(200).json({
//             message: 'Erro credenciais!',
//             status: false,
//             error: true,
//             statusColor: 'warning',
//             doNotNotifyFields: true,
//             color: 'red',
//             isClearFields: false
//           });
//         }
//       });

//     }


//   } catch (error) {
//     console.log(error)
//   }



// });


exports.createUser = asyncHandler(async (req, res, next) => {

  validate.requestBodyData(validationConditions.createUser, req);
  return res.status(200).json(await post(req, user, validate));

});



