const express = require("express");
const qnaRoute =express.Router();
const {QnaModel}=require("../model/qna");


qnaRoute.get("/qna",async(req,res)=>{
    try{
        let data =  await QnaModel.find();
        res.status(200).send({"msg":data})
    }
    catch(err){
        res.status(400).send({"error":err})
    }

})

qnaRoute.post("/qna",async(req,res)=>{
    console.log("post")
    try{
        let payload= req.body;
        console.log(payload)
        let post= new QnaModel(payload);
        post.save();
        res.status(200).send({"Msg":"Added in DB"})
        
    }catch(err){
        res.status(400).send({"Error":err.message})

    }
})

module.exports={qnaRoute}