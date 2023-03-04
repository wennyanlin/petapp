const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
//only need one guard: ensureUserLoggedIn
function ensureUserLoggedIn(req, res, next) {
  let token = getToken(req);
  
  try {
    res.locals.payload = jwt.verify(token, SECRET_KEY);
    next();
  } catch (err) {
    res.status(401).send({ error: "Unauthorized" });
  }
}

function getToken(req) {
  if (!("authorization" in req.headers)) {
    return "";
  }

  let authHeader = req.headers["authorization"];
  let [str, token] = authHeader.split(" ");
  return str === "Bearer" ? token : "";
}

module.exports = {
  ensureUserLoggedIn
};
