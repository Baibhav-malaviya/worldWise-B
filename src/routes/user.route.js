const { Router } = require("express");
const { doExist, registeredUser } = require("../controllers/register");
const { logInUser } = require("../controllers/logInUser");

const userRouter = Router();

userRouter.route("/signUp").post(doExist, registeredUser);

userRouter.route("/logIn").post(logInUser);

module.exports = { userRouter };
