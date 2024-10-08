import passport from "passport";
import github from "passport-github2";
import local from "passport-local";
import { UsuariosDAO } from "../dao/UsuariosDAO.js";
import { generaHash, validaPass } from "../utils.js";
import passportJWT from "passport-jwt";
import config from "../config/env.config.js";
import { UsuariosDTO } from "../dto/usuariosDTO.js";

const buscarToken = (req) => {
  let token = null;

  if (req.cookies.CoderCookie) {
    token = req.cookies.CoderCookie;
  }

  return token;
};

export const iniciaPassport = () => {
  // 1) definir estrategias
  passport.use(
    "registro",
    new local.Strategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          //let { nombre, apellido, edad, rol } = req.body;

          // fullName, firstName... rol
          let usuarioParaDB = req.body;
          console.log(usuarioParaDB);

          let existe = await UsuariosDAO.getBy({ email: username });
          if (existe) {
            console.log("usuario repetido");
            return done(null, false);
          }

          let nuevoUsuario = await UsuariosDAO.create({
            email: usuarioParaDB.email,
            last_name: usuarioParaDB.nombre,
            first_name: usuarioParaDB.apellido,
            //full_name: usuarioParaDB.full_name,
            age: usuarioParaDB.edad,
            role: usuarioParaDB.role,
            password: generaHash(usuarioParaDB.password),
          });
          const usuarioRegistrado = new UsuariosDTO(nuevoUsuario);
          console.log(usuarioRegistrado);

          return done(null, usuarioRegistrado);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    // login (local)
    "login",
    new local.Strategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          let usuario = await UsuariosDAO.getBy({ email: username });
          if (!usuario) {
            console.log("usuario invalido");
            return done(null, false, { message: "Login failed!" });
          }

          if (!validaPass(password, usuario.password)) {
            console.log("password invalida");
            return done(null, false, { message: "Contraseña Incorrecta" });
          }

          delete usuario.password;

          return done(null, usuario);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "current",
    new passportJWT.Strategy(
      {
        secretOrKey: config.SECRET,
        jwtFromRequest: new passportJWT.ExtractJwt.fromExtractors([
          buscarToken,
        ]),
      },
      async (contenidoToken, done) => {
        try {
          return done(null, contenidoToken);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // http://localhost:3000/api/sessions/callbackGithub
  // clientID  Iv23li31T5vlaYdmaOpb
  // secretClient   0876c66d8c46634e0b83c2cb84569ce56789f885

  passport.use(
    // github
    "github",
    new github.Strategy(
      {
        clientID: "Iv23lifFJLo4KYXy1Jij",
        clientSecret: "8b6fbe09a9c6a1f066d9646e03ab5b0dddf6c1fb",
        callbackURL: "http://localhost:3000/api/sessions/callbackGithub",
      },
      async (t, rt, profile, done) => {
        console.log("Hola");
        try {
          let { email, name } = profile._json;
          if (!email) {
            return done(null, false);
          }
          let usuario = await UsuariosDAO.getBy({ email });
          if (!usuario) {
            usuario = await UsuariosDAO.create({
              nombre: name,
              email,
              profile,
            });
          }

          return done(null, usuario);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  /*
  // 1') solo si usamos sessions
  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  passport.deserializeUser((user, done) => {
    return done(null, user);
  });

*/
};
