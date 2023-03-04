var express = require("express");
var router = express.Router();

router.get("/favorites", "only need one guard", async (req, res, next) => {
  try {
    const results = await db(`SELECT * FROM pets where userId = ${userId}`);
    if (results.data.length !== 0) {
      res.send(results.data);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/favorites", async (req, res, next) => {
  let { petId } = req.body;
});

router.delete("/favorites", async (req, res, next) => {
  let { petId } = req.body;
});

module.exports = router;
