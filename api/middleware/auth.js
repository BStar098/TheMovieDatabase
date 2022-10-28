const validateToken = require("../config/tokens").validateToken;

const validateUser = (req, res, next) => {
  /*ESTO LO SACAMOS DE LA LOGICA DE LA RUTA Y LO CONVERTIMOS EN UN MIDDLEWARE. 
  RECOGEMOS EL TOKEN, VALIDAMOS EL TOKEN Y, EN EL CASO DE QUE LA VALIDACIÓN HAYA SIDO EXITOSA, NOS DEVOLVERÁ EL PAYLOAD DEL USUARIO, QUE SERÍAN SUS DATOS NO SENSIBLES.
  LUEGO, SI ESE USUARIO EXISTE, RETORNAMOS NEXT(), FUNCIÓN LA CUAL VA A "PERMITIR" LA EJECUCIÓN DEL RESTO DE RUTAS. SI ES USUARIO NO EXISTE, ENVIAMOS  "STATUS 401, NO AUTORIZADO"
  */
  const TOKEN = req.cookies.userToken;
  const { username } = validateToken(TOKEN);
  req.user = username;
  if (username) return next();
  res.sendStatus(401); //Unauthorized
};

module.exports = validateUser;
