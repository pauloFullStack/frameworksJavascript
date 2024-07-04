const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const url = require("url");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const uuid = require("uuid");
const crypto = require("crypto");
// const user = require('./models/user');
// const bcrypt = require("bcryptjs");
// Route
const indexRouter = require("./routes/index");
const library = require("./routes/library");
const controller = require('./controllers/redirectLibrary');
const { validateLogin } = require('./controllers/apiLibrary');

const app = express();

// const agora = new Date();

// // Obtém o fuso horário do sistema
// const fusoHorarioSistema = Intl.DateTimeFormat().resolvedOptions().timeZone;

// // Define o fuso horário da data atual para o fuso horário do sistema
// agora.toLocaleString('pt-BR', { timeZone: fusoHorarioSistema });

// // Obtém o timestamp correspondente à data atual no fuso horário do sistema
// const timestamp = agora.getTime();

// console.log('Timestamp da data e hora atual:', timestamp);

const myUUID = uuid.v4();
const hashedUUID = crypto.createHash("sha256").update(myUUID).digest("hex");
// Configurar o middleware express-session
app.use(
  session({
    secret: hashedUUID,
    resave: false,
    saveUninitialized: false,
    cookie: {
      originalMaxAge: 60 * 60 * 1000, // 1 hora em milissegundos
      expires: new Date(Date.now() + 60 * 60 * 1000), // Expira em 1 hora a partir do momento atual
      httpOnly: false,
      secure: false, // Remova o comentário se estiver usando HTTPS
    },
    loggedin: false
  })
);


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/library/api/logout", function (req, res, next) {
  req.session.loggedin = false;
  return res.status(200).json({ redirect: true, route: 'library/edit' });
});

app.use("/library/api/edit/section/add", function (req, res, next) {
  if (!req.session.loggedin) {
    return res.status(200).json({ redirect: true, route: 'library/edit' });
  } else {
    next();
  }
});

app.use("/library/api/edit/page/add", function (req, res, next) {
  if (!req.session.loggedin) {
    return res.status(200).json({ redirect: true, route: 'library/edit' });
  } else {
    next();
  }
});

app.use("/library/edit/section", function (req, res, next) {
  if (!req.session.loggedin) {
    return res.status(200).json({ redirect: true, route: 'library/edit' });
  } else {
    next();
  }
});


app.use("/library/edit/section/add", function (req, res, next) {
  if (!req.session.loggedin) {
    return res.status(200).json({ redirect: true, route: 'library/edit' });
  } else {
    next();
  }
});


app.use("/library/edit/section/list", function (req, res, next) {
  if (!req.session.loggedin) {
    return res.status(200).json({ redirect: true, route: 'library/edit' });
  } else {
    next();
  }
});


app.use("/library/edit/page", function (req, res, next) {
  if (!req.session.loggedin) {
    return res.status(200).json({ redirect: true, route: 'library/edit' });
  } else {
    next();
  }
});

app.use("/library/edit/page/add", function (req, res, next) {
  if (!req.session.loggedin) {
    return res.status(200).json({ redirect: true, route: 'library/edit' });
  } else {
    next();
  }
});


app.use("/library/edit/page/list", function (req, res, next) {
  if (!req.session.loggedin) {
    return res.status(200).json({ redirect: true, route: 'library/edit' });
  } else {
    next();
  }
});

app.use("/library/api/create/user", function (req, res, next) {
  // Criar variaveis de ambiente para colocar os tokens
  if (req.body.token !== '48bdd9cb-2432-4f97-9444-acf9d1e53700') {
    return res.status(200).json({ error: true, message: 'Você não tem permissão' });
  } else {
    next();
  }
});


app.use(async (req, res, next) => {

  if (!req.session.loggedin && req.url === '/library/api/validate/user' && req.method === 'POST') {
    await validateLogin(req, res);
  } else if (req.url === '/library/edit' && !req.session.loggedin) {
    controller.login(req, res);
  } else {
    next();
  }

});

app.use("/", indexRouter);
app.use("/library", library);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
