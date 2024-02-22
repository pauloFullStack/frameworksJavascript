// const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require("express-async-handler");
const axios = require("axios");

// @desc    Get All users
// @route   GET /api/v1/expense/users
// @access  Private
exports.sendEmail = asyncHandler(async (req, res, next) => {

  const objSendEmail = req.body;

  const isNullOrEmptyName =
    objSendEmail.name.trim() == null || objSendEmail.name.trim() == "" ? true : false;
  const nameLength = objSendEmail.name.trim().length > 3 ? true : false;

  const isNullOrEmptyEmail =
    objSendEmail.email.trim() == null || objSendEmail.email.trim() == "" ? true : false;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateEmail = regexEmail.test(objSendEmail.email.trim());

  const isNullOrEmptyPhone =
    objSendEmail.phone.trim() == null || objSendEmail.phone.trim() == "" ? true : false;
  const phoneLength = objSendEmail.phone.trim().length == 15 ? true : false;

  let existDescription = false;
  let descriptionLength = false;

  if (objSendEmail.description.trim() != "") {
    existDescription = true;
    descriptionLength = objSendEmail.description.trim().length >= 10 ? true : false;
  }

  if (
    isNullOrEmptyName ||
    isNullOrEmptyEmail ||
    isNullOrEmptyPhone ||
    !validateEmail ||
    !nameLength ||
    !phoneLength ||
    (existDescription && !descriptionLength)
  ) {
    return res.status(200).json({
      status: "warning",
      message: "Preencha os campos obrigatórios!",
      isClearFields: false,
      isNullOrEmptyName,
      isNullOrEmptyEmail,
      isNullOrEmptyPhone,
      validateEmail,
      nameLength,
      phoneLength,
      existDescription,
      descriptionLength,
    });
  }

  const data = {
    sender: {
      name: "Paulo Renato",
      email: "paulofullstack@hotmail.com",
    },
    to: [
      {
        email: "paulorenatoads@gmail.com",
        name: "PauloWebDeveloper",
      },
    ],
    subject: "Trabalhos online PauloWebDev",
    htmlContent: `
    <!DOCTYPE html>
    <html lang="pt-br">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div style="margin-bottom: 10px;padding: 1rem;border: solid 1px #000;border-radius: 5px;" >
          <div>
            <b><i>Nome: </i></b> ${objSendEmail.name}
          </div>
          <hr>
          <div>
            <b><i>Telefone: </i></b> ${objSendEmail.phone}
          </div>
          <hr>
          <div>
            <b><i>Email: </i></b> ${objSendEmail.email}
          </div>
          <hr>
          <div>
            <b><i>Mensagem: </i></b> ${objSendEmail.description}
          </div>
        </div>
      </body>
    </html>

                  `,
  };

  // try {
    axios
      .post("https://api.brevo.com/v3/smtp/email", data, {
        headers: {
          accept: "application/json",
          "api-key":
            "API_KEY_YOU",
          "content-type": "application/json",
        },
      })
      .then((response) => {
        return res
          .status(200)
          .json({ status: "success", message: "Email enviado com sucesso!", isClearFields: true });
      })
      .catch((error) => {
        return res
          .status(200)
          .json({ status: "error", message: "Erro ao enviar email, tente novamente!", isClearFields: false });
      });

  // } catch (e) {
  //   console.log(e)
  // }
});
