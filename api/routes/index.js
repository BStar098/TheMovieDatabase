const generateToken = require("../config/tokens").generateToken;
const validateUser = require("../middleware/auth");
const User = require("../models");
const express = require("express");
const router = express.Router();

router.post("/signUp", (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      res.sendStatus(201);
    })
    .catch((error) => console.error(error));
});
router.post("/logIn", (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ where: { username } })
    .then((user) => {
      user.validatePassword(password).then((isValid) => {
        if (isValid) {
          const TOKEN = generateToken({ username });

          res.cookie("userToken", TOKEN).send({ username });
        } else res.sendStatus(401);
      });
    })
    .catch((error) => res.sendStatus(401));
});
router.get("/me", validateUser, (req, res, next) => {
  res.send(req.user);
});

router.get("/logOut", (req, res, next) => {
  res.clearCookie("userToken").send(204);
});

router.put("/:username/:movieId", (req, res, next) => {
  //add to Favorites
  const { username, movieId } = req.params;
  User.findOne({ where: { username } }).then((user) => {
    if (!user || user.dataValues.favorites.includes(Number(movieId))) {
      return res.sendStatus(401);
    }
    user.dataValues.favorites.push(movieId);
    const newFavorites = user.dataValues.favorites;
    User.update({ ...user, favorites: newFavorites }, { where: { username } })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.error(error);
      });
  });
});

router.get("/:username/favorites", (req, res, next) => {
  const { username } = req.params;
  User.findOne({ where: { username } })
    .then((user) => {
      res.send(user.dataValues.favorites);
    })
    .catch((error) => console.error(error));
});

router.put("/favorites/:username/:movieId", (req, res, next) => {
  //remove from favorites
  const { username, movieId } = req.params;
  User.findOne({ where: { username } }).then((user) => {
    if (!user) {
      return res.sendStatus(401);
    }
    const indexOfMovieToDelete = user.dataValues.favorites.indexOf(movieId);
    user.dataValues.favorites.splice(indexOfMovieToDelete, 1);
    const newFavorites = user.dataValues.favorites;
    User.update({ ...user, favorites: newFavorites }, { where: { username } })
      .then(() => {
        res.send(newFavorites);
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
module.exports = router;
