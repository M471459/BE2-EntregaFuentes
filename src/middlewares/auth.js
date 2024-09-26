export const auth = (permiso) => {
  return (req, res, next) => {
    // req.user  que deja passport
    console.log(req.user.role);
    if (req.user?.role !== permiso) {
      res.setHeader("Content-Type", "application/json");
      return res.status(403).json({
        error: `No tiene privilegios suficientes para acceder al recuros solicitado`,
      });
    }

    next();
  };
};
