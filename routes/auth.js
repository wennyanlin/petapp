var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const db = require("../model/helper");
//User register:
router.post("/register", async (req, res) => {
  let { username, email, password } = req.body;
  let hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    let sql = `INSERT INTO users (username, email, password) VALUES ('${username}','${email}', '${hashedPassword}')`;
    await db(sql);
    res.send({ message: "Registration succeeded" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//User login:
router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  try {
    let results = await db(
      `SELECT * FROM users WHERE username = '${username}'`
    );
    if (results.data.length === 0) {
      res.status(401).send({ error: "Login failed" });
    } else {
      let user = results.data[0];
      let passwordCheck = await bcrypt.compare(password, user.password);
      if (passwordCheck) {
        let payload = { userId: user.id };
        let token = jwt.sign(payload, SECRET_KEY);
        delete user.password;
        res.send({
          message: "Login succeeded",
          token: token,
          user: user,
        });
      } else {
        res.status(401).send({ error: "Login failed" });
      }
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
module.exports = router;
