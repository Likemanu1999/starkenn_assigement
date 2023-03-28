const TitleModel = require("../model/TitleModel");
const UserModel = require("../model/UserModel")

const TitleLogin = async (req, res) => {
    try {
        let requestbody = req.body
        let UserSaved = await TitleModel.create(requestbody);
        res.status(201).send({ status: true, message: "User Title successfully created", data: UserSaved });
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};


const getUserTitle = async (req,res) => {
    try {
        let page = req.params.page || 1;
        let perPage = 5;
        let titleCard = await TitleModel.find().skip((perPage * page) - perPage).limit(perPage);
        res.status(201).send({ status: true, message: "Title All data",data: titleCard,Count: titleCard.length});
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const UpdateTitle = async (req,res)=>{
    try{
       const titleId = req.params.titleId;
       let requestBody = req.body;
       let { status, title, description } = requestBody;

       if (!titleId){
        return res.status(400).send({ status: false, message: "Please enter TitleId in params" })
       } 
       let titles = await TitleModel.findOne({ _id: titleId})
        if (!titleId) return res.status(404).send({ status: false, message: "titleId Not Found" })

        let updateData = await TitleModel.updateOne({  _id: titleId }, { $set: { status: requestBody.status, title: requestBody.title, description: requestBody.description } });
       return res.status(200).send({ status : true , message: "Success" , data : updateData })
    }  
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

const DeleteTitle = async function (req,res){
    try{
        let titleId = req.params.titleId;
        let RemoveTitle = await TitleModel.findOneAndDelete(titleId);   
        return res.status(200).send({ status : true , message: "Title delete Successfully " })
      } catch (error) {
          return res.status(500).send({ status: false, message: error.message });
      }
}

const getTitleByFilter = async (req, res) => {
    try {
        let data =  req.query;
        let { status, title, description } = data;
        let filter = {...data};
        let page = req.params.page || 1;
        let perPage = 5;
        let dataInfo = await TitleModel.find(filter).select({_id:1,status:1,title:1,description:1}).skip((perPage * page) - perPage).limit(perPage);; 
        return res.status(200).send({status: true,message: "Success", data: dataInfo,Count: dataInfo.length});
      } catch (err) {
        return res.status(500).send({ status: false, error: err.message });
      }
};

module.exports = { TitleLogin , getUserTitle, UpdateTitle ,DeleteTitle , getTitleByFilter }