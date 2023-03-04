var express = require("express");
var router = express.Router();
const db = require("../model/helper");

const { ensureUserLoggedIn } = require(`../middleware/guard`);

router.get("/favorites", ensureUserLoggedIn, async (req, res, next) => {
  //we got the correct token after guard checked:
  const userId = res.locals.payload.userId;

  try {
    const results = await db(
      `SELECT p.* FROM pets AS p JOIN users_pets ON users_pets.petId = p.id WHERE users_pets.userId = ${userId}`
    );
    if (results.data.length !== 0) {
      res.send(results.data);
    }
  } catch (err) {
    // console.log(err)
    res.status(500).send(err);
  }
});

router.post("/favorites", ensureUserLoggedIn, async (req, res, next) => {
  let { petId } = req.body;
  const userId = res.locals.payload.userId;

  try {
    //users_pets table add petId, then return the updated table
    const results = await db(
      `INSERT INTO users_pets(userId, petId) VALUES (${userId}, ${petId})`
    ); //added liked pet
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/favorites", ensureUserLoggedIn, async (req, res, next) => {
  let { petId } = req.body;
  const userId = res.locals.payload.userId;

  try {
    const deletePet = await db(
      `DELETE FROM users_pets WHERE userId = ${userId} AND petId = ${petId}`
    );
    const updatedResult = await db(
      `SELECT p.* FROM pets AS p JOIN users_pets ON users_pets.petId = p.id WHERE users_pets.userId = ${userId}`
    ); //get updated all liked pets
    res.send(updatedResult.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
