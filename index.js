const express = require("express")
const app = express()
const port = 3000

const users = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];
//added a comment.
const submissions = []
app.post('/signup',(req,res) => {
    const {email,password} = req.body;
    const existinguser = users.find(user => user.email === email);
    if(existinguser)
    {
        res.status(409).send("user already exists");
    }
    else
    {
        const newuser={
            email: email,
            password: password
        };
        users.push(newuser);
        res.status(200).send('user sucessfully created.');
    }
})
app.post('/login',(req,res) => {
    const {email,password} = req.body;
    const existinguser = users.find(user => user.email===email);
    if(!existinguser)
    {
        res.status(401).send("Incorrect email or password.");
    }
    else
    {
        if(existinguser.password!=password)
        {
            res.status(401).send("Incorrect email or password.");
        }
        else
        {
            const token = "random token";
            res.status(200).json({token});
        }
    }
})

app.get('/questions',(req,res) => {
    res.status(200).json(QUESTIONS);
})

app.get('/submissions',(req,res) => {
    const {userid, problemtitle} = req.query;
    
    const usersubmissions = submissions.filter(submission => submission.userid === userid && submission.problemtitle === problemtitle);
    res.status(200).json({usersubmissions});
})
app.listen(port,()=>{
    console.log('listening to the port' + " " + port);
})