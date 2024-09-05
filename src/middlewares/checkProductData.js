export const checkproductData = async (req, res, next) => {
  try {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    } = req.body;
    const newProduct = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnail,
    };
    let hasUndefinedFields = false;

    for (const key in newProduct) {
      if (key !== "thumbnail" && newProduct[key] === undefined) {
        hasUndefinedFields = true;
        break;
      }
    }
    if (hasUndefinedFields) {
      return res.status(404).json({
        status: "error",
        msg: "Todos los campos son obligatorios a excepción de Thumbnail",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "error", msg: "Error interno del servidor" });
  }
};
