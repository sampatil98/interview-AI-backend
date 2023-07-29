const mongoose = require("mongoose");

const qnaSchema = mongoose.Schema({
    question:String,
    ans:String,
},
{versionKey:false}
)

const QnaModel = mongoose.model("qna",qnaSchema)

module.exports={QnaModel}