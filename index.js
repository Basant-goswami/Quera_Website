const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');

const port = 8080;

app.use(methodOverride('_method'));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"public")));
app.set("views", path.join(__dirname,"views"));

let data = [
    {
        id : uuidv4(),
        username : "basant",
        content : "Time heals everything"
    },
    {
        id : uuidv4(),
        username : "abhishek",
        content : "nothing is immpossible"
    },
    {
        id : uuidv4(),
        username : "ayush",
        content : "zindagi bhula kar ke jiya to kya jiya"
    }
];

app.get("/posts",(req,res) =>{
    res.render("index.ejs", {data});
})

app.get("/posts/new", (req,res) =>{
    res.render("form.ejs");
})

app.post("/posts", (req,res) => {
    let id = uuidv4();
    let {username,content} = req.body;
    data.push({id,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id", (req,res) => {
    let {id} = req.params;
    let post = data.find((p) => id === p.id);
    res.render("show.ejs",{ post});
})

app.patch("/posts/:id",(req,res) =>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = data.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res) => {
    let {id} = req.params;
    let post = data.find((p) => id === p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res) => {
    let {id} = req.params;
    data = data.filter((p) => id !== p.id);
    // console.log(data);
    res.redirect("/posts");
})

app.listen(port,() => {
    console.log(`server is running on port ${port}`);
})