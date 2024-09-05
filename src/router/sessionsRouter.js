import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import config from "../config/env.config.js";
import { passportCall } from "../utils.js";

export const sessionRouter = Router();

//sessionRouter.use(passport.authenticate("jwt", { session: false }));

sessionRouter.get("/error", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  return res.status(400).json({ error: `Error en passport... :(` });
});

// 3) autenticar la estrategia en el router de sessions (en la ruta...)
sessionRouter.post(
  "/registro",
  passport.authenticate("registro", {
    failureRedirect: "/api/sessions/error",
    session: false,
  }),
  (req, res) => {
    console.log("Usuario nuevo creado");

    res.setHeader("Content-Type", "application/json");
    res.status(201).json({
      message: "Registro exitoso",
      usuarioRegistrado: req.user,
    });
  }
);

sessionRouter.post("/login", passportCall("login"), (req, res) => {
  let token = jwt.sign(req.user, config.SECRET, {
    expiresIn: "1h",
  });
  res.cookie("CoderCookie", token, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
  });

  res.setHeader("Content-Type", "application/json");
  return res
    .status(200)
    .json({ payload: "login exitoso", usuarioLogueado: req.user });
});

/*
sessionRouter.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/error",
    session: false,
    failureFlash: true,
  }),
  (req, res, info) => {
    //req.session.usuario = req.user;
    delete req.user.password;

    let token = jwt.sign(req.user, config.SECRET, {
      expiresIn: "1h",
    });
    res.cookie("CoderCookie", token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({
      message: "Login exitoso",
      usuarioLogueado: req.user,
      token,
    });
  }
);
*/
/*sessionRouter.get("/logout", (req, res) => {
  let { web } = req.query;

  req.session.destroy((error) => {
    if (error) {
      res.setHeader("Content-Type", "application/json");
      return res.status(500).json({ error: `Error en logout` });
    }

    if (web) {
      return res.redirect("/login?mensaje=Logout exitoso...!!!");
    }
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({ payload: "Logout exitoso" });
  });
});
*/
sessionRouter.get("/usuario", passportCall("current"), (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({
    mensaje: "Perfil usuario",
    datosUsuario: req.user,
  });
});

sessionRouter.get("/github", passportCall("github"), (req, res) => {
  let token = jwt.sign(req.user, config.SECRET, {
    expiresIn: "1h",
  });
  res.cookie("CoderCookie", token, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
  });

  res.setHeader("Content-Type", "application/json");
  return res
    .status(200)
    .json({ payload: "login exitoso", usuarioLogueado: req.user });
});

/*sessionRouter.get(
  "/github",
  passport.authenticate("github", {}),
  (req, res) => {}
);*/

sessionRouter.get(
  "/callbackGithub",
  passport.authenticate("github", { failureRedirect: "/api/sessions/error" }),
  (req, res) => {
    let token = jwt.sign(req.user, config.SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
    res.cookie("CoderCookie", token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({
      message: "Login exitoso",
      usuarioLogueado: req.user,
    });
  }
);

export default sessionRouter;
