const express=require("express");
const {openai}=require("./config")

// const {qnaRoute}=require("./routes/qnaRoute")
// const {connection}= require("./db")

const cors = require('cors');

const app=express();

app.use(express.json());
app.use(cors());

// app.use("/qna",qnaRoute)


app.post("/submit-ans",async (req,res)=>{
    try {
        const {prompt,studentAnswer}=req.body;
        let data= await callChatGPT(prompt,studentAnswer);
        res.status(200).send({
            isError:false,
            data:data
        });
        
    } catch (error) {
        res.status(401).send({
            isError:true,
            error:error
        });
    }
});

app.get('/getQuestion', async (req, res) => {
    try {
      const {target}=req.query;
      console.log(target);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `ask 1 question on ${target} `,
        max_tokens: 3000
      });
  
      const question = response.data.choices[0].text.trim();
      res.json({ question });
    } catch (error) {
      console.error('Error fetching question:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });


  app.post('/feed-back', async (req, res) => {
    try {
      const {avgScore}=req.body;

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: ` In the interview interviewer give score ${avgScore} out of 10 to the candidate Now interviewer want to gave feedback to the candidate so please generate feedback`,
        max_tokens: 3000
      });
  
      const question = response.data.choices[0].text.trim();
      res.json({ question });
    } catch (error) {
      console.error('Error fetching question:', error.message);
      res.status(500).json({ error: 'Server error' });
    }
  });


async function callChatGPT(text,studentAnswer){
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",

            prompt: `Question:${text}\nStudent Answer: ${studentAnswer}\n compare student Answer with actual answer and give correct answer with Score out of 10. use this format "Score: 0/10 \n feedback:generated feedback " `,

            max_tokens: 3000
        })
        return (completion.data.choices[0].text);
    }catch (e) {
        return e
    }
    
}


app.listen(8080,async()=>{
    try {
        // await connection
        console.log("server is running");
    } catch (error) {
        console.log(error);
    }

})




// trail new route

app.get('/study-getQuestion', async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `give 1 question with proper answer with explaination on node.js`,
      max_tokens: 3000
    });
    // console.log(response.data);
    const question = response.data.choices[0].text.trim();
    let array=question.trim().split("\n");
    let Q=array[0];
    let A=array.slice(1).join("");
    res.json({"question":Q,"answer":A});
  } catch (error) {
    console.error('Error fetching question:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

