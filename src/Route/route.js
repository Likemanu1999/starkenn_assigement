const express = require("express")
const router = express.Router()
const UserController = require("../Controller/UserContoller")
const TitleController = require("../Controller/TitleController")
const mid = require("../middleware/middleware")

// <-----------User register----------------->
router.post("/UserCreate",UserController.createuser);
router.post("/Userlogin",UserController.loginUser);

// <-----------title register----------------->
router.post("/TitleCreate",mid.mid1,TitleController.TitleLogin);
router.get("/getusertitle",mid.mid1,TitleController.getUserTitle);
router.patch("/Updatetitle/:titleId",mid.mid1,TitleController.UpdateTitle);
router.delete("/deletetitle/:titleId",mid.mid1,TitleController.DeleteTitle);
router.get("/getFilterStatus",TitleController.getTitleByFilter)


// <-----------No Page Found----------------->
router.all('*', (req, res) => {res.status(404).send({status : false, message:"No Page Found !!"})})

module.exports=router