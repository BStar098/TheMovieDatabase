const db = require("../db");
const S = require("sequelize");
const bcrypt = require("bcrypt");

class User extends S.Model {
  hashPassword(password, salt) {
    return bcrypt.hash(password, salt).then((hashedPassword) => hashedPassword);
  }
  validatePassword(password) {
    return bcrypt
      .hash(password, this.salt)
      .then((hashedPassword) => hashedPassword === this.password)
      .catch((error) => console.error(error));
  }
}

User.init(
  {
    username: { type: S.STRING, validate: { notEmpty: true } },
    password: { type: S.STRING, validate: { notEmpty: true } },
    favorites: { type: S.ARRAY(S.INTEGER), defaultValue: [] },
    salt: { type: S.STRING },
  },
  { sequelize: db, modelName: "user" }
);
User.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync();
  user.salt = salt;
  return user.hashPassword(user.password, user.salt).then((hashedPassword) => {
    user.password = hashedPassword;
  });
});
module.exports = User;
