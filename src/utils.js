import bcrypt from "bcrypt";
import passport from "passport";

export const passportCall = (estrategia) => (req, res, next) => {
  passport.authenticate(
    estrategia,
    { session: false },
    (error, usuario, info) => {
      if (error) {
        return next(error);
      } // contempla salidas return done(error) de la estrategia

      if (!usuario) {
        // contempla salidas return done(null, false) de la estrategia
        res.setHeader("Content-Type", "application/json");
        return res
          .status(400)
          .json({ error: `${info.message ? info.message : info.toString()}` });
      }

      req.user = usuario; // contempla salidas return done(null, usuario) de la estrategia
      next();
    }
  )(req, res, next);
};

export const generaHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const validaPass = (passText, passHash) =>
  bcrypt.compareSync(passText, passHash);
