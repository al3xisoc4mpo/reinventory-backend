const express = require("express")
const router = express.Router()

const authorization = require("./../middlewares/authorization")

const usersController = require("./../controllers/usersController")


router.post("/create", usersController.create)

router.post("/login", usersController.login)

router.get("/:id", authorization, usersController.verifyToken)

router.get("/verifytoken", authorization, usersController.verifyToken)



module.exports = router