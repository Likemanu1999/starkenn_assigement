const UserModel = require("../model/UserModel")
const { isValidEmail } = require("../validator/validator");
const jwt = require("jsonwebtoken");


const createuser = async (req, res) => {
    try {
        let requestbody = req.body
        let { firstname, lastname, email,password, status , title , description } = requestbody;
        if (!firstname) return res.status(400).send({ status: false, message: "firstname required" });
        if (!lastname) return res.status(400).send({ status: false, message: "lastname required" });
        if (!isValidEmail(email)) return res.status(400).send({ status: false, message: "email required" });
        const isEmailAlreadyUsed = await UserModel.findOne({ email: requestbody.email });
        if (isEmailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${requestbody.email} email is already registered` })
        }
        if (!password) return res.status(400).send({ status: false, message: "password required" });
      
        
        let UserSaved = await UserModel.create(requestbody);
        res.status(201).send({ status: true, message: "user successfully created", data: UserSaved });
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const loginUser = async function (req, res) {
    try {
        let data = req.body
        let { email, password } = data;
        if(!data) return res.status(400).send({ status: false, message: "No input by user" });
        if(!email) return res.status(400).send({ status: false, msg: "email is required." });
        if(!password) return res.status(400).send({ status: false, msg: "Password is required." });

        let getUser = await UserModel.findOne({ email });
        if (!getUser) return res.status(404).send({ status: false, msg: "User not found or Email Id is invalid" });

        //To create token
        let token = jwt.sign(
            {
                userId: getUser._id,
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            }, "starkenn")

        res.setHeader('authorization', 'Bearer' + token);
        return res.status(200).send({ status: true, message: "User login sucessful", data: { userId: getUser._id, token: token }, });

    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ status: false, message: "Error", error: err.message });
    }
};


module.exports = { createuser , loginUser }