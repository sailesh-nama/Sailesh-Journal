const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "Hello All I'm a second year computer science engineering student at VIT, Vellore. Have an intermediate skills in c++, python and Java. Learning full stack development. Experienced committee member with a demonstrated history of working in the non-profit organization management industry. Have a keen interest in exploring different domains, eager to work in a learning & challenging environment where I can utilise and grow my skills.";
const a ="Here you can see all my Travell Vlogs, Food Vlogs amd much more intresting content.";

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://sailesh_nama:Sailesh333@cluster0.3qgfd.mongodb.net/blogDB", {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post",postSchema);

app.get("/", function(req, res){
  Post.find({}, function(err, posts){
    res.render("home",{home:homeStartingContent, a:a, posts:posts});
  });
});

app.get("/about", function(req, res){
  res.render("about");
});

app.get("/contact", function(req, res){
  res.render("contact");
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post1 = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post1.save(function(err){
  if (!err){
    console.log("sucess");
    res.redirect("/");
  }
});
});

app.get("/posts/:postId", function(req, res){
  const requestedId = req.params.postId;
  Post.findOne({_id: requestedId}, function(err, post){
    res.render("post", {
      title: post.title,
      body: post.content
    });
  });
});

let port = process.env.PORT;
if(port == null || port == ""){
 port = 3000;
}

app.listen(port, function() {
  console.log("Server running");
});
