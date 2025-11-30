const express = require('express');
const mongoose = require('mongoose');
const TodoModel = require('./models/todo.model');
const bodyParser = require('body-parser')
const app = express();


var mongooseurl="mongodb+srv://vijaythotireddy:hima143@cluster0.jedr8qd.mongodb.net/Todos?retryWrites=true&w=majority";


mongoose
    .connect(mongooseurl)
    .then(()=>{
        console.log("connect")
    })
    .catch(()=>{
        console.log("not connected");
    });

app.use(express.static(__dirname+"/public"))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set("view engine", "pug")

app.get('/',(req,res)=>{
    res.send("WELCOME TO TODO-APPLICATION")
})

app.get('/todos',(req,res)=>{
    TodoModel.find({}).then((data)=> res.render("todos", {todos:data }));
})

app.post('/addTodo',(req,res)=>{
    console.log(req.body)

    var newTodo = new TodoModel({
        title: req.body.title,
        status: "pending",
        timestamp : Date.now(),
    });
    newTodo.save();
    console.log(newTodo)
    res.send("agaraa babuu")
})

app.listen(3400,()=>{
    console.log("server running on port 3400")
})